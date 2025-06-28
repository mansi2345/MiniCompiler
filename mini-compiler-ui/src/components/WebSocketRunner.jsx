// components/WebSocketRunner.jsx
import { useState, useEffect, useRef } from "react";
import "./OutputViewer.css";

export default function WebSocketRunner({ code }) {
  const [output, setOutput] = useState("");
  const [connected, setConnected] = useState(false);
  const [ws, setWs] = useState(null);
  const inputRef = useRef("");

  const connectWebSocket = () => {
    const socket = new WebSocket("ws://localhost:5000");

    socket.onopen = () => {
      setOutput(""); // clear previous output
      setConnected(true);
      socket.send(JSON.stringify({ type: "run", code }));
    };

    socket.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.type === "output" || msg.type === "error") {
          setOutput((prev) => prev + msg.data);
        } else if (msg.type === "done") {
          setConnected(false);
          socket.close(); // 💡 important
        }
      } catch (err) {
        setOutput((prev) => prev + "\n[Invalid JSON or ANSI output]\n");
      }
    };

    socket.onclose = () => {
      setConnected(false);
    };

    setWs(socket);
  };

  const sendInput = () => {
    if (ws && inputRef.current.value) {
      ws.send(JSON.stringify({ type: "input", data: inputRef.current.value }));
      inputRef.current.value = "";
    }
  };

  return (
    <div className="output-container">
      <h3>Real-Time Output</h3>
      <pre className="output-box">{output}</pre>
      <div>
        <input
          type="text"
          placeholder="Type input..."
          ref={inputRef}
          onKeyDown={(e) => e.key === "Enter" && sendInput()}
        />
        <button onClick={sendInput}>Send</button>
        <button onClick={connectWebSocket} disabled={connected}>
          Run Realtime
        </button>
      </div>
    </div>
  );
}
