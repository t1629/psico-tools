import { useState } from "react";

const TurnoFiltradoForm = ({ onFilter, onReset }) => {
  const [tituloFilter, setTituloFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    onFilter({
      titulo: tituloFilter,
      date: dateFilter,
    });
  };

  return (
    <form className="calendar-tools__filters" onSubmit={handleSubmit}>
      <label>
        Título
        <input
          type="text"
          value={tituloFilter}
          onChange={(e) => setTituloFilter(e.target.value)}
          placeholder="Ingrese el título o motivo"
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
          setTituloFilter("");
          setDateFilter("");
          onReset();
        }}
      >
        Ver todos
      </button>
    </form>
  );
};

export default TurnoFiltradoForm;
