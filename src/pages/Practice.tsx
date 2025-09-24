 
import { useState } from "react";

export default function Practice() {
  const [correct, setCorrect] = useState(0);
  const [tries, setTries] = useState(0);

  const simulatePrediction = () => {
    setTries(t => t+1);
    const ok = Math.random() > 0.4;
    if (ok) setCorrect(c => c+1);
  };

  const pct = tries ? Math.round((correct/tries)*100) : 0;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Práctica</h2>
      <div className="mb-4">
        <p>Progreso: {pct}%</p>
        <div className="w-full bg-gray-200 h-4 rounded">
          <div style={{ width: `${pct}%` }} className="h-4 bg-green-500 rounded" />
        </div>
      </div>

      <div className="flex gap-2">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded" onClick={simulatePrediction}>Probar predicción</button>
      </div>
    </div>
  );
}
