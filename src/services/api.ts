const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export async function postTrain(modelId: string) {
  const res = await fetch(`${API_BASE}/train/${modelId}`, { method: "POST" });
  return res.json();
}

export async function uploadCaptures(modelId: string, data: any) {
  const res = await fetch(`${API_BASE}/captures/${modelId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}
