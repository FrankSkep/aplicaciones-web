import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { useAppSelector } from "./store/hooks/hooks";
import { useAppDispatch } from "./store/hooks/hooks";
import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  reset,
} from "./features/counter/counterSlice";

function App() {
  const value = useAppSelector((state) => state.counter.value);
  const status = useAppSelector((state) => state.counter.status);
  const dispatch = useAppDispatch();

  const [amount, setAmount] = useState(0);

  return (
    <main style={{ fontFamily: "sans-serif", padding: 25 }}>
      <h1>Redux Toolkit + Vite</h1>
      <p>
        Valor: <strong>{value}</strong>
      </p>
      <p>Status: {status}</p>

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
        <button onClick={() => dispatch(incrementByAmount(amount))}>
          Add Amount
        </button>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}></div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <button onClick={() => dispatch(incrementByAmount(amount))}>
        Increment By Amount
      </button>
      <button
        onClick={() => dispatch(incrementAsync(amount))}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Loading..." : "Increment Async"}
      </button>
    </main>
  );
}

export default App;
