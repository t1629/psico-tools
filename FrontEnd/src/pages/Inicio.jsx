import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, getDay, parse, startOfWeek } from "date-fns";
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
  const { agendas, loading, error, reload, getByDate, getByPatient, getById } =
    useCalendar();
  const [actionError, setActionError] = useState(null);
  const [currentView, setCurrentView] = useState("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  const runAction = async (action) => {
    setActionError(null);
    try {
      await action();
    } catch (err) {
      setActionError(err.message ?? "No se pudo completar la operación.");
    }
  };

  const handleSelectEvent = (event) => {
    const id = event.resource?.agendaId ?? event.id;
    navigate(`/agenda/${id}`);
  };

  const handleFilter = ({ date, patientId, agendaId }) => {
    runAction(() => {
      if (date) return getByDate(date);
      if (patientId) return getByPatient(patientId);
      if (agendaId) return getById(agendaId);
      return reload();
    });
  };

  const events = toCalendarEvents(agendas);

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
        <TurnoFiltradoForm onFilter={handleFilter} onReset={reload} />
      </section>

      <section className="calendar-panel" aria-label="Calendario de turnos">
        {loading ? (
          <div className="calendar-panel__state">Cargando agenda...</div>
        ) : (
          <Calendar
            culture="es"
            view={currentView}
            onView={setCurrentView}
            date={currentDate}
            onNavigate={setCurrentDate}
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
            eventPropGetter={(task) => ({
              style: {
                backgroundColor:
                  task.type === "descanso" ? "lightgray" : "lightblue",
                borderRadius: "4px",
                padding: "2px",
              },
            })}
          />
        )}
      </section>
    </main>
  );
};

export default Inicio;
