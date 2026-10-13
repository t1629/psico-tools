import { useState } from "react";
import { create } from "../services/agendaService";
import "../styles/layout/AgendaForm.css";

const AgendaForm = ({ onCreated }) => {
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [psicologoId, setPsicologoId] = useState(0);
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const horaInicioFormatted =
      horaInicio.length === 5 ? `${horaInicio}:00` : horaInicio;
    const horaFinFormatted = horaFin.length === 5 ? `${horaFin}:00` : horaFin;

    const newAgenda = {
      agendaId: 0,
      psicologoId,
      psicologoNombre: "",
      psicologoApellido: "",
      //   consultorioId: 1,
      diaSemana: "",
      horaInicio: horaInicioFormatted,
      horaFin: horaFinFormatted,
      fecha,
      descripcion,
    };

    try {
      await create(newAgenda);
      if (onCreated) onCreated();
      setFecha("");
      setHoraInicio("");
      setHoraFin("");
      setPsicologoId(0);
      setDescripcion("");
    } catch (error) {
      console.error("Error creando agenda:", error);
    }
  };

  return (
    <form className="agenda-form" onSubmit={handleSubmit}>
      <label htmlFor="agenda-fecha">Fecha</label>
      <input
        id="agenda-fecha"
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        className="agenda-input"
      />
      <label htmlFor="agenda-hora-inicio">Hora de inicio</label>
      <input
        id="agenda-hora-inicio"
        type="time"
        value={horaInicio}
        onChange={(e) => setHoraInicio(e.target.value)}
        className="agenda-input"
      />
      <label htmlFor="agenda-hora-fin">Hora de fin</label>
      <input
        id="agenda-hora-fin"
        type="time"
        value={horaFin}
        onChange={(e) => setHoraFin(e.target.value)}
        className="agenda-input"
      />
      <label htmlFor="agenda-descripcion">Descripción</label>
      <input
        id="agenda-descripcion"
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="agenda-input"
      />
      <label htmlFor="agenda-psicologo">ID Psicólogo</label>
      <input
        id="agenda-psicologo"
        type="number"
        placeholder="ID Psicólogo"
        value={psicologoId}
        onChange={(e) => setPsicologoId(Number(e.target.value))}
        className="agenda-input"
      />
      <button type="submit" className="agenda-button">
        Crear Agenda
      </button>
    </form>
  );
};

export default AgendaForm;
