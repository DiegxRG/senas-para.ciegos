 
// services/storage.ts
export const saveModelLocal = async (model: any) => {
  const models = JSON.parse(localStorage.getItem("models") || "[]");
  models.unshift(model);
  localStorage.setItem("models", JSON.stringify(models));
};

export const getModelsLocal = () => {
  return JSON.parse(localStorage.getItem("models") || "[]");
};

export const getModelLocal = (id: string) => {
  const models = getModelsLocal();
  return models.find((m: any) => m.id === id);
};

export const saveCapturesLocal = async (modelId: string, label: string, landmarks: number[][]) => {
  const key = `captures_${modelId}`;
  const db = JSON.parse(localStorage.getItem(key) || "{}");
  if (!db[label]) db[label] = [];
  db[label].push({ landmarks, ts: Date.now() });
  localStorage.setItem(key, JSON.stringify(db));
};

export const getCapturesLocal = (modelId: string) => {
  return JSON.parse(localStorage.getItem(`captures_${modelId}`) || "{}");
};
