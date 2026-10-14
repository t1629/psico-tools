import PsicologoForm from "../components/PsicologoForm";
import PsicologoCard from "../components/PsicologoCard";
import { usePsicologo } from "../hooks/usePsicologo";
import "../styles/layout/PsicologoPage.css";

export default function PsicologoPage() {
  const { psicologos, loading, error } = usePsicologo();

  return (
    <div className="psicologo-page">
      <h1>Psicólogo</h1>

      <section className="psicologo-form-section">
        <PsicologoForm />
      </section>

      <section className="psicologo-list-section">
        {loading && <p>Cargando...</p>}
        {error && <p className="error">Error: {error.message}</p>}
        <div className="psicologo-list">
          {psicologos.map((p) => (
            <PsicologoCard key={p.psicologoId} psicologo={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
