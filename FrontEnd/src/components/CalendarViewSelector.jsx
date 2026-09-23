const CalendarViewSelector = ({ currentView, onChangeView }) => {
  return (
    <div className="calendar-view-buttons">
      <button
        className={currentView === "month" ? "active" : ""}
        onClick={() => onChangeView("month")}
      >
        Mes
      </button>
      <button
        className={currentView === "week" ? "active" : ""}
        onClick={() => onChangeView("week")}
      >
        Semana
      </button>
      <button
        className={currentView === "day" ? "active" : ""}
        onClick={() => onChangeView("day")}
      >
        Día
      </button>
      <button
        className={currentView === "agenda" ? "active" : ""}
        onClick={() => onChangeView("agenda")}
      >
        Agenda
      </button>
    </div>
  );
};

export default CalendarViewSelector;
