 
export function exportCapturesJSON(modelId: string) {
  const key = `captures_${modelId}`;
  const data = localStorage.getItem(key) || "{}";
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${modelId}_captures.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importCapturesJSON(modelId: string, file: File) {
  return new Promise<void>((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const obj = JSON.parse(reader.result as string);
        localStorage.setItem(`captures_${modelId}`, JSON.stringify(obj));
        res();
      } catch(e) { rej(e); }
    };
    reader.onerror = rej;
    reader.readAsText(file);
  });
}
