// backend/terminal.js
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const pty = require("node-pty");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws) {
  const shell = process.env.SHELL || "bash";
  const ptyProcess = pty.spawn(shell, [], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env,
  });

  ptyProcess.on("data", (data) => {
    ws.send(data);
  });

  ws.on("message", (msg) => {
    ptyProcess.write(msg);
  });

  ws.on("close", () => {
    ptyProcess.kill();
  });
});

server.listen(3001, () => {
  console.log("Terminal backend listening on http://localhost:3001");
});
