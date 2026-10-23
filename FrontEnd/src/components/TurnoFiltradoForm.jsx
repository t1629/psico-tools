import { useState } from "react";

const TurnoFiltradoForm = ({ onFilter, onReset }) => {
  const [dateFilter, setDateFilter] = useState("");
  const [patientFilter, setPatientFilter] = useState("");
  const [patientNametFilter, setPatientNameFilter] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onFilter({
      date: dateFilter,
      pacienteApellido: patientFilter,
      pacienteNombre: patientNametFilter,
    });
  };

  return (
    <form className="calendar-tools__filters" onSubmit={handleSubmit}>
      <label>
        Paciente (apellido)
        <input
          type="text"
          value={patientFilter}
          onChange={(e) => setPatientFilter(e.target.value)}
          placeholder="Ej. González"
        />
      </label>

      <label>
        Paciente (nombre)
        <input
          type="text"
          value={patientNametFilter}
          onChange={(e) => setPatientNameFilter(e.target.value)}
          placeholder="Ej. Laura"
        />
      </label>

      <label>
        Fecha
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </label>

      <button type="submit">Buscar</button>
      <button
        type="button"
        className="calendar-tools__secondary"
        onClick={() => {
          setDateFilter("");
          setPatientFilter("");
          setPatientFilter("");
          onReset();
        }}
      >
        Ver todos
      </button>
    </form>
  );
};

export default TurnoFiltradoForm;
