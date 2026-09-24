import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, getDay, parse, startOfWeek, addMinutes } from "date-fns";
import { es } from "date-fns/locale/es";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCalendar } from "../hooks/useCalendar";
import { toCalendarEvents } from "../utils/calendarEvents";
import "../styles/layout/Inicio.css";
import { useNavigate } from "react-router-dom";
import TurnoFiltradoForm from "../components/TurnoFiltradoForm";

const locales = { es };
const localizer = dateFnsLocalizer({
  format,
  getDay,
  locales,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
});

const messages = {
  allDay: "Todo el día",
  previous: "Anterior",
  next: "Siguiente",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Turno",
  noEventsInRange: "No hay turnos en este período.",
};

const Inicio = () => {
  const {
    appointments,
    loading,
    error,
    reload,
    getByDate,
    getByPatient,
    getById,
    getPacienteByTurno,
    getTurnosByPaciente,
  } = useCalendar();
  const [actionError, setActionError] = useState(null);
  const [currentView, setCurrentView] = useState("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  const runAction = async (action) => {
    setActionError(null);
    try {
      await action();
    } catch (requestError) {
      setActionError(
        requestError.message ?? "No se pudo completar la operación.",
      );
    }
  };

  const handleSelectEvent = (event) => {
    const id = event.resource?.id ?? event.resource?.idTurno ?? event.id;
    navigate(`/turnos/${id}`);
  };

  const handleFilter = ({
    date,
    patientId,
    turnoId,
    turnoPaciente,
    turnoPacienteId,
  }) => {
    runAction(() => {
      if (date) return getByDate(date);
      if (patientId) return getByPatient(patientId);
      if (turnoId) return getById(turnoId);
      if (turnoPaciente) return getPacienteByTurno(turnoPaciente);
      if (turnoPaciente && turnoPacienteId)
        return getTurnosByPaciente(turnoPaciente, turnoPacienteId);
      return reload();
    });
  };

  const handleReset = () => {
    reload();
  };

  const events = toCalendarEvents(appointments).map((t) => {
    const start = new Date(`${t.fecha}T${t.hora}`);
    const end = addMinutes(start, t.minutos ?? 60);
    return {
      id: t.turnoID,
      title: t.descripcion || "Turno",
      start,
      end,
      resource: t,
      type: t.estado === "descanso" ? "descanso" : "turno",
    };
  });
  return (
    <main className="app-content calendar-page">
      <header className="calendar-page__header">
        <div>
          <p className="calendar-page__eyebrow">Agenda clínica</p>
          <h1>Turnos</h1>
          <p className="calendar-page__description">
            Organiza tus consultas y revisa la disponibilidad de la semana.
          </p>
        </div>
        <div className="calendar-page__summary" aria-live="polite">
          <strong>{events.length}</strong>
          <span>turnos cargados</span>
        </div>
      </header>

      {error && (
        <div className="calendar-page__notice" role="alert">
          <span>No pudimos cargar la agenda.</span>
          <button type="button" onClick={reload}>
            Reintentar
          </button>
        </div>
      )}

      {actionError && (
        <div className="calendar-page__notice" role="alert">
          <span>{actionError}</span>
          <button type="button" onClick={() => setActionError(null)}>
            Cerrar
          </button>
        </div>
      )}

      <section className="calendar-tools" aria-label="Herramientas de agenda">
        <TurnoFiltradoForm onFilter={handleFilter} onReset={handleReset} />
      </section>

      <section className="calendar-panel" aria-label="Calendario de turnos">
        {loading ? (
          <div className="calendar-panel__state">Cargando agenda...</div>
        ) : (
          <Calendar
            culture="es"
            view={currentView}
            onView={(view) => setCurrentView(view)}
            date={currentDate}
            onNavigate={(date) => setCurrentDate(date)}
            defaultView="week"
            views={["month", "week", "day", "agenda"]}
            events={events}
            localizer={localizer}
            messages={messages}
            onSelectEvent={handleSelectEvent}
            popup
            showAllEvents
            startAccessor="start"
            endAccessor="end"
            titleAccessor="title"
            eventPropGetter={(task) => {
              const style = {
                backgroundColor:
                  task.type === "descanso" ? "lightgray" : "lightblue",
                borderRadius: "4px",
                padding: "2px",
              };
              return { style };
            }}
          />
        )}
      </section>
    </main>
  );
};

export default Inicio;
