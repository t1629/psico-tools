import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCalendar } from "../hooks/useCalendar";
import * as psicologosService from "../services/PsicologoService";
import * as pacientesService from "../services/PacienteService";
import * as consultoriosService from "../services/ConsultorioService";
import { useToast } from "../hooks/useToast";
import "../styles/layout/AgendaForm.css";

const AgendaForm = ({ onCreated }) => {
  const { create, update, getById, loading, error } = useCalendar();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Modo edicion: el detalle de agenda redirige a /crearAgenda?id=<agendaId>
  // y este form carga los datos mostrados para modificarlos en su lugar.
  const editId = searchParams.get("id");
  const isEditing = Boolean(editId);

  const toast = useToast();

  const [psicologos, setPsicologos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [consultorios, setConsultorios] = useState([]);

  // Los selects guardan el ID seleccionado (unica fuente de verdad); el
  // objeto del catalogo se deriva en el render, sin efectos de mapeo.
  const [agenda, setAgenda] = useState({
    fecha: "",
    horaInicio: "",
    horaFin: "",
    psicologoId: null,
    pacienteId: null,
    consultorioId: null,
    descripcion: "",
    titulo: "",
    estado: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setPsicologos(await psicologosService.getAll());
      setPacientes(await pacientesService.getAll());
      setConsultorios(await consultoriosService.getAll());
    };
    fetchData();
  }, []);

  // Precarga de la agenda existente (solo modo edicion). El setState ocurre
  // dentro del .then (callback asincrono), no sincrono en el effect.
  useEffect(() => {
    if (!editId) return undefined;
    let activo = true;
    getById(Number(editId))
      .then((agendaPrevia) => {
        if (!activo || !agendaPrevia) return;
        setAgenda({
          fecha: agendaPrevia.fecha ?? "",
          horaInicio:
            typeof agendaPrevia.horaInicio === "string"
              ? agendaPrevia.horaInicio.slice(0, 5)
              : "",
          horaFin:
            typeof agendaPrevia.horaFin === "string"
              ? agendaPrevia.horaFin.slice(0, 5)
              : "",
          psicologoId: agendaPrevia.psicologoId ?? null,
          pacienteId: agendaPrevia.pacienteId ?? null,
          consultorioId: agendaPrevia.consultorioId ?? null,
          descripcion: agendaPrevia.descripcion?.trim() ?? "",
          titulo: agendaPrevia.titulo?.trim() ?? "",
          estado: agendaPrevia.estado ?? "",
        });
      })
      .catch((err) => console.error("Error precargando la agenda:", err));
    return () => {
      activo = false;
    };
  }, [editId, getById]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const horaInicioFormatted =
      agenda.horaInicio.length === 5
        ? `${agenda.horaInicio}:00`
        : agenda.horaInicio;
    const horaFinFormatted =
      agenda.horaFin.length === 5 ? `${agenda.horaFin}:00` : agenda.horaFin;

    const newAgenda = {
      agendaId: isEditing ? Number(editId) : 0,
      psicologoId: agenda.psicologoId,
      pacienteId: agenda.pacienteId,
      consultorioId: agenda.consultorioId,
      // Passthrough del estado para no anular el valor actual en la BD.
      estado: agenda.estado || "Pendiente",
      horaInicio: horaInicioFormatted,
      horaFin: horaFinFormatted,
      fecha: agenda.fecha,
      descripcion: agenda.descripcion,
      titulo: agenda.titulo,
    };

    try {
      if (isEditing) {
        // Edicion: persiste con el mismo registro y vuelve al detalle
        // para que se vean los datos recien modificados.
        await update(newAgenda);
        toast.success("Cambios guardados con éxito.");
        navigate(`/agenda/${editId}`);
      } else {
        // Alta: crea, avisa y reinicia el form para cargar otro turno.
        await create(newAgenda);
        toast.success("¡Agenda creada con éxito!");
        if (onCreated) onCreated();
        setAgenda({
          fecha: "",
          horaInicio: "",
          horaFin: "",
          psicologoId: null,
          pacienteId: null,
          consultorioId: null,
          descripcion: "",
          titulo: "",
          estado: "",
        });
      }
    } catch (err) {
      console.error(
        isEditing ? "Error actualizando agenda:" : "Error creando agenda:",
        err,
      );
      toast.error(
        isEditing
          ? "No se pudo guardar la agenda."
          : "No se pudo crear la agenda.",
      );
    }
  };

  return (
    <main className="agenda-page">
      <header className="agenda-page__header">
        <p className="agenda-page__eyebrow">Agenda clínica</p>
        <h1>{isEditing ? "Editar agenda" : "Crear Agenda"}</h1>
        <p className="agenda-page__description">
          {isEditing
            ? "Modifica los datos del turno agendado."
            : "Reserva un nuevo bloque en tu calendario completando los datos del turno."}
        </p>
      </header>
      <form className="agenda-form" onSubmit={handleSubmit}>
        <div className="agenda-field agenda-field--full">
          <label htmlFor="agenda-titulo">Título</label>
          <input
            id="agenda-titulo"
            type="text"
            placeholder="Título"
            value={agenda.titulo}
            onChange={(e) => setAgenda({ ...agenda, titulo: e.target.value })}
            className="agenda-input"
          />
        </div>

        <div className="agenda-field">
          <label htmlFor="agenda-fecha">Fecha</label>
          <input
            id="agenda-fecha"
            type="date"
            value={agenda.fecha}
            onChange={(e) => setAgenda({ ...agenda, fecha: e.target.value })}
            className="agenda-input"
          />
        </div>

        <div className="agenda-field">
          <label htmlFor="agenda-hora-inicio">Hora de inicio</label>
          <input
            id="agenda-hora-inicio"
            type="time"
            value={agenda.horaInicio}
            onChange={(e) => setAgenda({ ...agenda, horaInicio: e.target.value })}
            className="agenda-input"
          />
        </div>

        <div className="agenda-field">
          <label htmlFor="agenda-hora-fin">Hora de fin</label>
          <input
            id="agenda-hora-fin"
            type="time"
            value={agenda.horaFin}
            onChange={(e) => setAgenda({ ...agenda, horaFin: e.target.value })}
            className="agenda-input"
          />
        </div>

        <div className="agenda-field">
          <label htmlFor="agenda-psicologo">Psicólogo</label>
          <select
            id="agenda-psicologo"
            value={agenda.psicologoId || ""}
            onChange={(e) =>
              setAgenda({
                ...agenda,
                psicologoId: Number(e.target.value) || null,
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
        </div>

        <div className="agenda-field">
          <label htmlFor="agenda-paciente">Paciente</label>
          <select
            id="agenda-paciente"
            value={agenda.pacienteId || ""}
            onChange={(e) =>
              setAgenda({
                ...agenda,
                pacienteId: Number(e.target.value) || null,
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
        </div>

        <div className="agenda-field">
          <label htmlFor="agenda-consultorio">Consultorio</label>
          <select
            id="agenda-consultorio"
            value={agenda.consultorioId || ""}
            onChange={(e) =>
              setAgenda({
                ...agenda,
                consultorioId: Number(e.target.value) || null,
              })
            }
            className="agenda-input"
          >
            <option value="">Seleccione...</option>
            {consultorios.map((c) => (
              <option key={c.consultorioId} value={c.consultorioId}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="agenda-field agenda-field--full">
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
        </div>

        <div className="agenda-form__footer agenda-field--full">
          <button type="submit" className="agenda-button" disabled={loading}>
            {loading ? "Guardando..." : isEditing ? "Guardar cambios" : "Crear Agenda"}
          </button>

          {error && (
            <p className="agenda-error" role="alert">
              Error: {String(error.message ?? error)}
            </p>
          )}
        </div>
      </form>
    </main>
  );
};

export default AgendaForm;
