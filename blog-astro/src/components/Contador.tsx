import React, { useState } from "react";
import "./Contador.css";

interface Props {
  inicial?: number;
}

export default function Contador({ inicial = 0 }: Props) {
  const [contador, setContador] = useState<number>(inicial);
  return (
    <div className="contador">
      <h2>Contador Interactivo (React)</h2>
      <div className="display">{contador}</div>
      <div className="botones">
        <button onClick={() => setContador((c) => c + 1)}>
          Incrementar
        </button>
        <button onClick={() => setContador((c) => c - 1)}>
          Decrementar
        </button>
      </div>
    </div>
  );
}
