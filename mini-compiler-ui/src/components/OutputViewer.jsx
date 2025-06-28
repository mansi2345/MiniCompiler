import { useState } from "react";
import "./OutputViewer.css";
import useWebSocketRunner from "../hooks/useWebSocketRunner";

export default function OutputViewer({
  output = "",
  assembly = "",
  ir = "",
  realtimeOutput,
  setRealtimeOutput,
  code,
  wsConnected,
  setWsConnected,
  setAssembly,
  setIR,
}) {
  const [activeTab, setActiveTab] = useState("realtime");

  const { connectWebSocket, sendInput, inputRef } = useWebSocketRunner({
    code,
    setRealtimeOutput,
    setWsConnected,
    setAssembly,
    setIR,
  });

  const renderContent = () => {
    switch (activeTab) {
      case "assembly":
        return (
          <pre className="output-box">{assembly || "No assembly code."}</pre>
        );
      case "ir":
        return <pre className="output-box">{ir || "No additional data."}</pre>;
      case "realtime":
      default:
        return (
          <>
            <pre className="output-box">{realtimeOutput || "No output."}</pre>
            <div className="realtime-input-row">
              <input
                type="text"
                placeholder="Type input..."
                ref={inputRef}
                onKeyDown={(e) => e.key === "Enter" && sendInput()}
              />
              <button onClick={sendInput}>Send</button>
            </div>
            <button
              onClick={connectWebSocket}
              className="compile-btn"
              disabled={wsConnected}
            >
              Compile
            </button>
          </>
        );
    }
  };

  return (
    <div className="output-container">
      <div className="tab-header">
        <button
          className={activeTab === "realtime" ? "active" : ""}
          onClick={() => setActiveTab("realtime")}
        >
          Output
        </button>
        <button
          className={activeTab === "assembly" ? "active" : ""}
          onClick={() => setActiveTab("assembly")}
        >
          Assembly
        </button>
        <button
          className={activeTab === "ir" ? "active" : ""}
          onClick={() => setActiveTab("ir")}
        >
          IR
        </button>
      </div>

      <div className="tab-content">{renderContent()}</div>
    </div>
  );
}
