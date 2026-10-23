import "../styles/UI/TurnoCard.css";
import AsistenciComponent from "./AsistenciaComponent";

export function TurnoCard({ turno, onEdit, onRemove }) {
  return (
    <div className="turno-card">
      <h3 className="turno-card__title">
        {turno.fecha} {turno.hora} - {turno.estado?.toUpperCase()}
      </h3>
      <p className="turno-card__subtitle">
        Paciente: {turno.pacienteNombre ?? turno.paciente?.nombre}{" "}
        {turno.pacienteApellido ?? turno.paciente?.apellido}
      </p>
      <p className="turno-card__subtitle">
        Psicólogo: {turno.psicologoNombre ?? turno.psicologo?.nombre}{" "}
        {turno.psicologoApellido ?? turno.psicologo?.apellido}
      </p>
      <p className="turno-card__detail">Duración: {turno.minutos} min</p>
      {turno.modalidadVirtual && (
        <p className="turno-card__detail">Sesión virtual: {turno.url}</p>
      )}
      <AsistenciComponent turno={turno} />

      <div className="turno-card__actions">
        <button onClick={() => onEdit(turno)}>Editar</button>
        <button className="danger" onClick={() => onRemove(turno.turnoId)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}
