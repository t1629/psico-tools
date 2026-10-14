import "../styles/layout/PsicologoCard.css";

export default function PsicologoCard({ psicologo }) {
  return (
    <div className="psicologo-card">
      <h3>
        {psicologo.nombre} {psicologo.apellido}
      </h3>
      <p>
        <strong>Email:</strong> {psicologo.email}
      </p>
      <p>
        <strong>Teléfono:</strong> {psicologo.telefono}
      </p>
    </div>
  );
}
