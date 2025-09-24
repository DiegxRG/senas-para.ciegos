 
import Card from "../components/Card";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="grid gap-6">
      <header className="text-center">
        <h1 className="text-4xl font-bold">SignLang AI</h1>
        <p className="text-gray-600 mt-2">Entrena y prueba modelos para reconocimiento de señas (vocales, abecedario, números, operaciones).</p>
      </header>

      <section className="grid md:grid-cols-3 gap-4">
        <Card title="Vocales">
          <p>Entrena A, E, I, O, U</p>
          <Link to="/create" className="inline-block mt-3 text-indigo-600">Crear modelo</Link>
        </Card>

        <Card title="Abecedario">
          <p>Entrena todas las letras</p>
        </Card>

        <Card title="Números & Operaciones">
          <p>1–9 y + - * /</p>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Modelos recientes</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {/* Aquí irían ModelCards (mock o de la API) */}
        </div>
      </section>
    </div>
  );
}
