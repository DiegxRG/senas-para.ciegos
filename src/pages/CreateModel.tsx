 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveModelLocal } from "../services/storage";

export default function CreateModel() {
  const [name, setName] = useState("");
  const [type, setType] = useState<"vowels" | "alphabet" | "calc">("vowels");
  const navigate = useNavigate();

  const onCreate = async () => {
    const model = {
      id: "m" + Date.now(),
      name: name || `Modelo ${type}`,
      type,
      createdAt: Date.now(),
      captures: {}, // estructura vacía para capturas por clase
    };
    await saveModelLocal(model);
    navigate(`/capture/${model.id}`);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Crear Modelo</h2>
      <label className="block mb-2">Nombre</label>
      <input className="border p-2 w-full mb-4" value={name} onChange={e => setName(e.target.value)} placeholder="Mi modelo" />

      <label className="block mb-2">Tipo</label>
      <select value={type} onChange={e => setType(e.target.value as any)} className="border p-2 w-full mb-4">
        <option value="vowels">Vocales</option>
        <option value="alphabet">Abecedario</option>
        <option value="calc">Calculadora</option>
      </select>

      <div className="flex gap-2">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded" onClick={onCreate}>Crear y Capturar</button>
      </div>
    </div>
  );
}
