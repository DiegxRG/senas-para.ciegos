 
import { useEffect, useRef, useState } from "react";
// npm i @mediapipe/hands @mediapipe/camera_utils
import { Hands, Results } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

export default function useMediaPipeHands() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cameraRef = useRef<any>(null);
  const handsRef = useRef<Hands | null>(null);
  const [latestLandmarks, setLatestLandmarks] = useState<number[][] | null>(null);

  useEffect(() => {
    const hands = new Hands({locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`});
    hands.setOptions({ maxNumHands: 2, modelComplexity: 1, minDetectionConfidence: 0.6, minTrackingConfidence: 0.6 });
    hands.onResults(onResults);
    handsRef.current = hands;

    return () => {
      hands.close();
    };
  }, []);

  const onResults = (results: Results) => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.clearRect(0,0,canvas.width,canvas.height);

    if (results.multiHandLandmarks) {
      // dibujar puntos simples
      results.multiHandLandmarks.forEach((landmarks) => {
        ctx.fillStyle = "rgba(0,150,255,0.8)";
        landmarks.forEach(pt => {
          ctx.beginPath();
          ctx.arc(pt.x * canvas.width, pt.y * canvas.height, 4, 0, Math.PI*2);
          ctx.fill();
        });
      });

      // transformar a un array simple y guardar
      const flattened = results.multiHandLandmarks.map(landmarks => landmarks.map(l => [l.x, l.y, l.z]));
      setLatestLandmarks(flattened as any);
    } else {
      setLatestLandmarks(null);
    }
  };

  const start = async () => {
    const video = videoRef.current!;
    if (!video) return;
    cameraRef.current = new Camera(video, {
      onFrame: async () => {
        if (handsRef.current) await handsRef.current.send({image: video});
      },
      width: 640,
      height: 480
    });
    cameraRef.current.start();
  };

  const stop = () => {
    cameraRef.current?.stop();
  };

  return { videoRef, canvasRef, start, stop, latestLandmarks };
}
