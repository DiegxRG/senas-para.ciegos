 
import { useEffect, useState } from "react";
import { getModelLocal, getCapturesLocal } from "../services/storage";

export default function TrainModel() {
  // params leer id, omitted for brevity
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const onStartTrain = async () => {
    setLogs([]);
    // Simulación de "entrainar" -> llamar backend
    setLogs(l => [...l, "Subiendo datos..."]);
    // POST a backend: /train with modelId
    // fetch('/api/train', { method:'POST', body:... })
    // Aquí simplemente simular:
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 300));
      setProgress(i);
    }
    setLogs(l => [...l, "Entrenamiento completado"]);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Entrenamiento</h2>
      <div className="mb-4">
        <div className="w-full bg-gray-200 h-4 rounded">
          <div style={{ width: `${progress}%` }} className="h-4 bg-indigo-600 rounded" />
        </div>
        <p className="text-sm mt-2">Progreso: {progress}%</p>
      </div>

      <div className="space-y-2">
        <button onClick={onStartTrain} className="px-4 py-2 bg-green-600 text-white rounded">Iniciar Entrenamiento</button>
        <div className="bg-white p-3 rounded shadow mt-3">
          {logs.map((l,i) => <div key={i} className="text-sm text-gray-700">{l}</div>)}
        </div>
      </div>
    </div>
  );
}
