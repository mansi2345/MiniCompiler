// App.jsx
import { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import OutputViewer from "./components/OutputViewer";
import LogoImage from "./components/LogoImage";
import ProductCard from "./components/ProductCard";

import "./App.css";

function App() {
  const [assembly, setAssembly] = useState("");
  const [code, setCode] = useState("");
  const [ir, setIR] = useState("");

  const [realtimeOutput, setRealtimeOutput] = useState("");
  const [wsConnected, setWsConnected] = useState(false);

  return (
    <div className="mainWindow">
      <div className="center-class">
        <div className="heading">
          <h1>Mini Compiler Interface</h1>
          <LogoImage />
        </div>
      </div>

      <div className="subWindow">
        <CodeEditor onCodeChange={setCode} />
        <OutputViewer
          assembly={assembly}
          ir={ir}
          realtimeOutput={realtimeOutput}
          setRealtimeOutput={setRealtimeOutput}
          code={code}
          wsConnected={wsConnected}
          setWsConnected={setWsConnected}
          setAssembly={setAssembly}
          setIR={setIR}
        />
      </div>

      <ProductCard />
    </div>
  );
}

export default App;
