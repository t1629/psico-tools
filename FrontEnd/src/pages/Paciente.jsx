import PacienteForm from "../components/PacienteForm";

export default function PacientePage() {
  return (
    <div className="paciente-page-container">
      <h1>Gestión de Pacientes</h1>
      <main>
        <PacienteForm />
      </main>
    </div>
  );
}
