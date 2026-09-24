import { useState } from "react";

const TurnoFiltradoForm = ({ onFilter, onReset }) => {
  const [dateFilter, setDateFilter] = useState("");
  const [patientFilter, setPatientFilter] = useState("");
  const [turnoIdFilter, setTurnoIdFilter] = useState("");
  const [turnoPacienteFilter, setTurnoPacienteFilter] = useState("");
  const [turnoPacienteIdFilter, setTurnoPacienteIdFilter] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onFilter({
      date: dateFilter,
      patientId: patientFilter,
      turnoId: turnoIdFilter,
      turnoPaciente: turnoPacienteFilter,
      turnoPacienteId: turnoPacienteIdFilter,
    });
  };

  return (
    <form className="calendar-tools__filters" onSubmit={handleSubmit}>
      <label>
        Fecha
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </label>

      <label>
        ID paciente
        <input
          type="text"
          value={patientFilter}
          onChange={(e) => setPatientFilter(e.target.value)}
          placeholder="Ej. 42"
        />
      </label>

      <label>
        ID turno
        <input
          type="text"
          value={turnoIdFilter}
          onChange={(e) => setTurnoIdFilter(e.target.value)}
          placeholder="Ej. 101"
        />
      </label>

      <label>
        Turno → Paciente
        <input
          type="text"
          value={turnoPacienteFilter}
          onChange={(e) => setTurnoPacienteFilter(e.target.value)}
          placeholder="Ej. ID turno"
        />
      </label>

      <label>
        Turno → Paciente → ID
        <input
          type="text"
          value={turnoPacienteIdFilter}
          onChange={(e) => setTurnoPacienteIdFilter(e.target.value)}
          placeholder="Ej. ID paciente"
        />
      </label>

      <button type="submit">Buscar</button>
      <button
        type="button"
        className="calendar-tools__secondary"
        onClick={() => {
          setDateFilter("");
          setPatientFilter("");
          setTurnoIdFilter("");
          setTurnoPacienteFilter("");
          setTurnoPacienteIdFilter("");
          onReset();
        }}
      >
        Ver todos
      </button>
    </form>
  );
};

export default TurnoFiltradoForm;
