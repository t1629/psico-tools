import "../styles/UI/TurnoCard.css";

export function TurnoCard({ turno, onEdit, onRemove }) {
  return (
    <div className="turno-card">
      <h3 className="turno-card__title">
        {turno.fecha} {turno.hora} - {turno.estado?.toUpperCase()}
      </h3>
      <p className="turno-card__subtitle">
        Paciente: {turno.paciente?.nombre} {turno.paciente?.apellido}
      </p>
      <p className="turno-card__subtitle">
        Psicólogo: {turno.psicologo?.nombre} {turno.psicologo?.apellido}
      </p>
      <p className="turno-card__detail">Duración: {turno.minutos} min</p>
      {turno.modalidadVirtual && (
        <p className="turno-card__detail">Sesión virtual: {turno.url}</p>
      )}

      <div className="turno-card__actions">
        <button onClick={() => onEdit(turno)}>Editar</button>
        <button className="danger" onClick={() => onRemove(turno.turnoId)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}
