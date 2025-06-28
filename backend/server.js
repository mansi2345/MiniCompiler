// server.js
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const { exec, spawn } = require("child_process");
const stripAnsi = require("strip-ansi");
const pty = require("node-pty");

const app = express();
const server = http.createServer(app); // HTTP + WebSocket combined
const wss = new WebSocket.Server({ server }); // WebSocket server

app.use(cors());
app.use(bodyParser.json());

const projectDir = "/mnt/d/basicFrontend/FinalMiniCompiler";

app.post("/compile", (req, res) => {
  const userCode = req.body.code;
  const userInput = req.body.input || "";

  fs.writeFileSync(`${projectDir}/test.prog`, userCode);

  exec("make run", { cwd: projectDir }, (err, stdout, stderr) => {
    if (err)
      return res.status(400).json({ error: stderr || "Compilation failed" });

    const lli = spawn("lli", ["output.ll"], { cwd: projectDir });

    let runOutput = "";
    let runError = "";

    lli.stdout.on("data", (data) => {
      runOutput += data.toString();
    });

    lli.stderr.on("data", (data) => {
      runError += data.toString();
    });

    lli.on("close", (code) => {
      if (code !== 0) {
        return res.status(400).json({ error: runError || "Runtime error" });
      }

      try {
        const irCode = fs.readFileSync(`${projectDir}/output.ll`, "utf8");

        let assembly = "";
        const asmPath = `${projectDir}/output.s`;
        if (fs.existsSync(asmPath)) {
          assembly = fs.readFileSync(asmPath, "utf8");
        }

        res.json({
          output: runOutput,
          assembly,
          ir: irCode,
        });
      } catch (readErr) {
        res.status(500).json({
          error: "Compilation succeeded but failed to read IR or ASM.",
        });
      }
    });

    if (userInput) {
      lli.stdin.write(userInput + "\n");
    }
    lli.stdin.end();
  });
});

wss.on("connection", (ws) => {
  let ptyProcess = null;

  ws.on("message", (msg) => {
    const parsed = JSON.parse(msg);

    if (parsed.type === "run") {
      const code = parsed.code;

      // Save the user code
      fs.writeFileSync(`${projectDir}/test.prog`, code);

      // Compile the code
      exec("make run", { cwd: projectDir }, (err, stdout, stderr) => {
        if (err) {
          ws.send(JSON.stringify({ type: "error", data: stderr }));
          return;
        }

        // ✅ Spawn using node-pty to emulate terminal behavior
        ptyProcess = pty.spawn("lli", ["output.ll"], {
          name: "xterm-color",
          cols: 80,
          rows: 30,
          cwd: projectDir,
          env: process.env,
        });

        ptyProcess.on("data", (data) => {
          ws.send(JSON.stringify({ type: "output", data }));
        });

        ptyProcess.on("exit", (code) => {
          ws.send(JSON.stringify({ type: "done", code }));
        });
      });
    }

    // Send user input
    if (parsed.type === "input" && ptyProcess) {
      ptyProcess.write(parsed.data + "\n");
    }
  });

  ws.on("close", () => {
    if (ptyProcess) {
      ptyProcess.kill();
    }
  });
});

app.get("/artifacts", (req, res) => {
  try {
    const irCode = fs.readFileSync(`${projectDir}/output.ll`, "utf8");

    let assembly = "";
    const asmPath = `${projectDir}/output.s`;
    if (fs.existsSync(asmPath)) {
      assembly = fs.readFileSync(asmPath, "utf8");
    }

    res.json({
      assembly,
      ir: irCode,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to read artifacts" });
  }
});

server.listen(5000, "0.0.0.0", () => {
  console.log("Backend (HTTP + WebSocket) running at http://localhost:5000");
});
