const firstValue = (item, keys, fallback = "") =>
  keys
    .map((key) => item?.[key])
    .find((value) => value !== undefined && value !== null && value !== "") ??
  fallback;

const toDate = (dateStr, timeStr) => {
  if (!dateStr) return null;

  const fechaLimpia =
    typeof dateStr === "string" ? dateStr.split("T")[0] : dateStr;

  const dateTimeString = timeStr ? `${fechaLimpia}T${timeStr}` : fechaLimpia;
  const date = new Date(dateTimeString);

  return Number.isNaN(date.getTime()) ? null : date;
};

export function toCalendarEvents(appointments = []) {
  return appointments.flatMap((appointment, index) => {
    const date = firstValue(appointment, ["fecha", "date", "dia"]);

    const startTime = firstValue(appointment, ["horaInicio", "inicio"]);
    const endTime = firstValue(appointment, ["horaFin", "fin"]);

    const start = toDate(date, startTime);
    const end = toDate(date, endTime);

    if (!start || !end) return [];

    const patient = firstValue(
      appointment,
      ["titulo", "pacienteNombre", "paciente"],
      "Turno",
    );

    const title =
      typeof patient === "object"
        ? (patient.nombre ?? patient.name ?? "Turno")
        : patient;

    return [
      {
        id:
          appointment.agendaId ??
          appointment.id ??
          appointment.idTurno ??
          index,
        title: String(title),
        description: appointment.descripcion,
        start,
        end: end <= start ? new Date(start.getTime() + 30 * 60 * 1000) : end,
        resource: appointment,
      },
    ];
  });
}
