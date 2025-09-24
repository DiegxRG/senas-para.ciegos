import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CreateModel from "./pages/CreateModel";
import CaptureModel from "./pages/CaptureModel";
import TrainModel from "./pages/TrainModel";
import Practice from "./pages/Practice";
import ModelsList from "./pages/ModelsList";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/models" element={<ModelsList />} />
          <Route path="/create" element={<CreateModel />} />
          <Route path="/capture/:modelId" element={<CaptureModel />} />
          <Route path="/train/:modelId" element={<TrainModel />} />
          <Route path="/practice/:modelId" element={<Practice />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
