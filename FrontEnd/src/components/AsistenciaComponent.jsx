import { useTurno } from "../hooks/useTurno";

export default function AsistenciComponent({ turno }) {
  const { markAsistio, markAusente } = useTurno();

  return (
    <div style={{ marginTop: "8px" }}>
      <p>Asistencia</p>
      <button onClick={() => markAsistio(turno.turnoId)}>✅ Asistió</button>
      <button onClick={() => markAusente(turno.turnoId)}>❌ No asistió</button>
    </div>
  );
}
