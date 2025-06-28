import { useState } from "react";
import useWebSocketRunner from "../hooks/useWebSocketRunner";
import "./CodeEditor.css";
export default function CodeEditor({ onCodeChange }) {
  const [code, setCode] = useState("");

  const handleChange = (e) => {
    setCode(e.target.value);
    if (onCodeChange) onCodeChange(e.target.value);
  };

  const handleSubmit = () => {
    /* if (code.trim()) {
      onSubmit(code, input);
    }*/
  };
  return (
    <div className="editor-container">
      <label className="editor-label">Write your code:</label>
      <textarea
        id="code-editor"
        value={code}
        onChange={handleChange}
        placeholder="// Your code here..."
        className="code-editor"
      />
    </div>
  );
}
