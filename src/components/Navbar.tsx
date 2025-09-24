import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">SENAS-IA</h1>
        <div className="flex gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/create" className="hover:underline">Crear Modelo</Link>
          <Link to="/models" className="hover:underline">Modelos</Link>
          <Link to="/practice" className="hover:underline">Práctica</Link>
        </div>
      </div>
    </nav>
  );
}
