 
export function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "es-PE"; // o "es-ES"
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}
