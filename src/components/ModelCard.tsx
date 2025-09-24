 
import { Link } from "react-router-dom";

export default function ModelCard({ model }: { model: any }) {
  return (
    <div className="border rounded p-4 flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold">{model.name}</h4>
          <p className="text-sm text-gray-600">Tipo: {model.type}</p>
        </div>
        <div className="text-xs text-gray-500">{new Date(model.createdAt).toLocaleString()}</div>
      </div>

      <div className="flex gap-2">
        <Link to={`/capture/${model.id}`} className="px-3 py-1 bg-indigo-600 text-white rounded">Capturar</Link>
        <Link to={`/train/${model.id}`} className="px-3 py-1 bg-green-600 text-white rounded">Entrenar</Link>
        <Link to={`/practice/${model.id}`} className="px-3 py-1 bg-yellow-600 text-white rounded">Practicar</Link>
      </div>
    </div>
  );
}
