import PacienteForm from "../components/PacienteForm";
import "../styles/layout/Paciente.css";

export default function PacientePage() {
  return (
    <main className="paciente-page">
      <header className="paciente-page__header">
        <div>
          <p className="paciente-page__eyebrow">Registro clínico</p>
          <h1>Gestión de Pacientes</h1>
          <p className="paciente-page__description">
            Crea y administra los pacientes de tu consulta.
          </p>
        </div>
      </header>

      <PacienteForm />
    </main>
  );
}
