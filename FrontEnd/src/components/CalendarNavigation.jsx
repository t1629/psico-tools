import { addDays } from "date-fns";

const CalendarNavigation = ({ currentDate, onChangeDate }) => {
  return (
    <div className="calendar-navigation">
      <button onClick={() => onChangeDate(addDays(currentDate, -1))}>
        Anterior
      </button>
      <button onClick={() => onChangeDate(new Date())}>Hoy</button>
      <button onClick={() => onChangeDate(addDays(currentDate, 1))}>
        Siguiente
      </button>
    </div>
  );
};

export default CalendarNavigation;
