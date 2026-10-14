import { useState, useEffect } from "react";
import { useCalendar } from "../hooks/useCalendar";
import * as psicologosService from "../services/PsicologoService";
import * as pacientesService from "../services/PacienteService";
// import * as consultoriosService from "../services/ConsultorioService";
import "../styles/layout/AgendaForm.css";

const AgendaForm = ({ onCreated }) => {
  const { create, loading, error } = useCalendar();

  const [psicologos, setPsicologos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  // const [consultorios, setConsultorios] = useState([]);

  const [agenda, setAgenda] = useState({
    fecha: "",
    horaInicio: "",
    horaFin: "",
    psicologo: null,
    paciente: null,
    consultorio: null,
    descripcion: "",
    titulo: "",
  });

  // cargar listas desde backend
  useEffect(() => {
    const fetchData = async () => {
      setPsicologos(await psicologosService.getAll());
      setPacientes(await pacientesService.getAll());
      // setConsultorios(await consultoriosService.getAll());   hay que agregaro primero al back aprqa mostarlo
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const horaInicioFormatted =
      agenda.horaInicio.length === 5
        ? `${agenda.horaInicio}:00`
        : agenda.horaInicio;
    const horaFinFormatted =
      agenda.horaFin.length === 5 ? `${agenda.horaFin}:00` : agenda.horaFin;

    const newAgenda = {
      agendaId: 0,
      psicologoId: agenda.psicologo?.psicologoId,
      pacienteId: agenda.paciente?.pacienteId,
      consultorioId: agenda.consultorio?.consultorioId,
      diaSemana: agenda.fecha
        ? new Date(agenda.fecha).toLocaleDateString("es-ES", {
            weekday: "long",
          })
        : "",
      horaInicio: horaInicioFormatted,
      horaFin: horaFinFormatted,
      fecha: agenda.fecha,
      descripcion: agenda.descripcion,
      titulo: agenda.titulo,
    };

    try {
      await create(newAgenda);
      if (onCreated) onCreated();
      setAgenda({
        fecha: "",
        horaInicio: "",
        horaFin: "",
        psicologo: null,
        paciente: null,
        consultorio: null,
        descripcion: "",
        titulo: "",
      });
    } catch (err) {
      console.error("Error creando agenda:", err);
    }
  };

  return (
    <form className="agenda-form" onSubmit={handleSubmit}>
      <label htmlFor="agenda-titulo">Título</label>
      <input
        id="agenda-titulo"
        type="text"
        placeholder="Título"
        value={agenda.titulo}
        onChange={(e) => setAgenda({ ...agenda, titulo: e.target.value })}
        className="agenda-input"
      />

      <label htmlFor="agenda-fecha">Fecha</label>
      <input
        id="agenda-fecha"
        type="date"
        value={agenda.fecha}
        onChange={(e) => setAgenda({ ...agenda, fecha: e.target.value })}
        className="agenda-input"
      />

      <label htmlFor="agenda-hora-inicio">Hora de inicio</label>
      <input
        id="agenda-hora-inicio"
        type="time"
        value={agenda.horaInicio}
        onChange={(e) => setAgenda({ ...agenda, horaInicio: e.target.value })}
        className="agenda-input"
      />

      <label htmlFor="agenda-hora-fin">Hora de fin</label>
      <input
        id="agenda-hora-fin"
        type="time"
        value={agenda.horaFin}
        onChange={(e) => setAgenda({ ...agenda, horaFin: e.target.value })}
        className="agenda-input"
      />

      <label htmlFor="agenda-descripcion">Descripción</label>
      <textarea
        id="agenda-descripcion"
        type="text"
        rows={4}
        placeholder="Descripción"
        value={agenda.descripcion}
        onChange={(e) => setAgenda({ ...agenda, descripcion: e.target.value })}
        className="agenda-input"
      />

      <label htmlFor="agenda-psicologo">Psicólogo</label>
      <select
        id="agenda-psicologo"
        value={agenda.psicologo?.psicologoId || ""}
        onChange={(e) =>
          setAgenda({
            ...agenda,
            psicologo: psicologos.find(
              (p) => p.psicologoId === Number(e.target.value),
            ),
          })
        }
        className="agenda-input"
      >
        <option value="">Seleccione...</option>
        {psicologos.map((p) => (
          <option key={p.psicologoId} value={p.psicologoId}>
            {p.nombre} {p.apellido}
          </option>
        ))}
      </select>

      <label htmlFor="agenda-paciente">Paciente</label>
      <select
        id="agenda-paciente"
        value={agenda.paciente?.pacienteId || ""}
        onChange={(e) =>
          setAgenda({
            ...agenda,
            paciente: pacientes.find(
              (p) => p.pacienteId === Number(e.target.value),
            ),
          })
        }
        className="agenda-input"
      >
        <option value="">Seleccione...</option>
        {pacientes.map((p) => (
          <option key={p.pacienteId} value={p.pacienteId}>
            {p.nombre} {p.apellido}
          </option>
        ))}
      </select>

      {/* Select de consultorios */}
      {/* <label htmlFor="agenda-consultorio">Consultorio</label>
      <select
        id="agenda-consultorio"
        value={agenda.consultorio?.consultorioId || ""}
        onChange={(e) =>
          setAgenda({
            ...agenda,
            consultorio: consultorios.find(
              (c) => c.consultorioId === Number(e.target.value),
            ),
          })
        }
        className="agenda-input"
      >
        <option value="">Seleccione...</option>
        {consultorios.map((c) => (
          <option key={c.consultorioId} value={c.consultorioId}>
            {c.nomrbe}
          </option>
        ))}
      </select> */}

      <button type="submit" className="agenda-button" disabled={loading}>
        {loading ? "Guardando..." : "Crear Agenda"}
      </button>

      {error && <p className="agenda-error">Error: {error.message}</p>}
    </form>
  );
};

export default AgendaForm;
