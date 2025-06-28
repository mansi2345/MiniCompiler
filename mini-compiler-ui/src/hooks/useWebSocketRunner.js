// hooks/useWebSocketRunner.js
import { useRef, useEffect } from "react";

export default function useWebSocketRunner({
  code,
  setRealtimeOutput,
  setWsConnected,
  setAssembly,
  setIR,
}) {
  const wsRef = useRef(null);
  const inputRef = useRef(null);

  const fetchArtifacts = async () => {
    try {
      const res = await fetch("http://localhost:5000/artifacts");
      const data = await res.json();
      if (setIR) setIR(data.ir || "");
      if (setAssembly) setAssembly(data.assembly || "");
    } catch (err) {
      console.error("Failed to fetch artifacts:", err);
    }
  };

  const connectWebSocket = () => {
    const socket = new WebSocket("ws://localhost:5000");

    socket.onopen = () => {
      setIR(""); // clear previous IR
      setAssembly(""); // clear previous Assembly
      setRealtimeOutput(""); // clear previous output (already there)
      setRealtimeOutput("");
      setWsConnected(true);
      socket.send(JSON.stringify({ type: "run", code }));
    };

    socket.onmessage = async (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.type === "output" || msg.type === "error") {
          setRealtimeOutput((prev) => prev + msg.data);
          if (msg.type === "error") {
            setWsConnected(false);
            socket.close(); // Important
          }
        } else if (msg.type === "done") {
          setRealtimeOutput((prev) => prev + "\n Compilation completed...");
          setWsConnected(false);
          socket.close();
          await fetchArtifacts();
        }
      } catch {
        setRealtimeOutput((prev) => prev + "\n[Invalid JSON/ANSI]\n");
      }
    };

    socket.onclose = () => setWsConnected(false);
    wsRef.current = socket;
  };

  const sendInput = () => {
    const inputValue = inputRef.current?.value?.trim();
    if (wsRef.current && inputValue) {
      wsRef.current.send(JSON.stringify({ type: "input", data: inputValue }));
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return {
    connectWebSocket,
    sendInput,
    inputRef,
  };
}
