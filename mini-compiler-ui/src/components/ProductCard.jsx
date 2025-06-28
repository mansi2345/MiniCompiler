// src/components/ProductCard.jsx
import "./ProductCard.css";

export default function ProductCard() {
  return (
    <div className="card">
      <p className="card-title">FLEX TO RUN</p>
      <p className="small-desc">
        A custom-built mini compiler for a lightweight C-inspired language.
        Designed using <b>Flex</b> (for lexing), <b>Bison</b> (for parsing), and{" "}
        <b>C++</b> for AST, semantic analysis, and{" "}
        <b>LLVM-based code generation</b>. Supports custom constructs like
        repeat, skip, and stop.
        <br />
      </p>
      <div className="go-corner">
        <div className="go-arrow">⚙️</div>
      </div>
    </div>
  );
}
