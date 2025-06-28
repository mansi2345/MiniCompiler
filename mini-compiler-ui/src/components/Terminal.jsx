// frontend/src/components/Terminal.js
import { useEffect } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";

const TerminalViewer = () => {
  useEffect(() => {
    const term = new Terminal();
    term.open(document.getElementById("terminal"));

    const socket = new WebSocket("ws://localhost:5000");
    term.onData((data) => socket.send(data));
    socket.onmessage = (e) => term.write(e.data);
  }, []);

  return <div id="terminal" style={{ height: "500px", width: "100%" }} />;
};

export default TerminalViewer;
