 
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import useMediaPipeHands from "../hooks/useMediaPipeHands";
import { getModelLocal, saveCapturesLocal } from "../services/storage";

export default function CaptureModel() {
  const { modelId } = useParams();
  const model = getModelLocal(modelId!);
  const { videoRef, canvasRef, start, stop, latestLandmarks } = useMediaPipeHands();
  const [selectedLabel, setSelectedLabel] = useState<string>("A");
  const [capturesCount, setCapturesCount] = useState(0);

  useEffect(() => {
    // ejemplo labels según tipo
    if (model?.type === "vowels") setSelectedLabel("A");
    if (model?.type === "alphabet") setSelectedLabel("A");
    if (model?.type === "calc") setSelectedLabel("1");
  }, [model]);

  const captureOnce = async () => {
    if (!latestLandmarks) return;
    await saveCapturesLocal(modelId!, selectedLabel, latestLandmarks);
    setCapturesCount(c => c + 1);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-3">Capturar — {model?.name}</h2>

        <div className="bg-black/80 rounded overflow-hidden">
          <video ref={videoRef} className="w-full h-64 object-cover" autoPlay playsInline muted/>
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
        </div>

        <div className="mt-3 flex gap-2">
          <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={start}>Iniciar</button>
          <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={stop}>Detener</button>
          <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={captureOnce}>Capturar</button>
          <button className="px-3 py-1 bg-gray-500 text-white rounded" onClick={() => { /* limpiar */ }}>Limpiar</button>
        </div>
        <p className="mt-2 text-sm text-gray-600">Capturas guardadas: {capturesCount}</p>
      </div>

      <div>
        <h3 className="font-semibold">Clase a capturar</h3>
        <select className="border p-2 w-full my-2" value={selectedLabel} onChange={e => setSelectedLabel(e.target.value)}>
          {generateLabels(model?.type).map(l => <option key={l} value={l}>{l}</option>)}
        </select>

        <div className="mt-4">
          <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded">Exportar JSON</button>
          <button className="w-full px-4 py-2 mt-2 bg-gray-200">Importar JSON</button>
        </div>
      </div>
    </div>
  );
}

function generateLabels(type: string | undefined) {
  if (type === "vowels") return ["A","E","I","O","U"];
  if (type === "alphabet") return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  if (type === "calc") return ["1","2","3","4","5","6","7","8","9","+","-","*","/"];
  return ["A","E","I","O","U"];
}
