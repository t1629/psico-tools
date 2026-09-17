const firstValue = (item, keys, fallback = "") =>
  keys
    .map((key) => item?.[key])
    .find((value) => value !== undefined && value !== null) ?? fallback;

const toDate = (value) => {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

export function toCalendarEvents(appointments = []) {
  return appointments.flatMap((appointment, index) => {
    const date = firstValue(appointment, ["fecha", "date", "dia", "start"]);
    const start = toDate(
      firstValue(appointment, ["inicio", "horaInicio", "start"], date),
    );
    const end = toDate(
      firstValue(appointment, ["fin", "horaFin", "end"], start),
    );

    if (!start || !end) return [];

    const patient = firstValue(
      appointment,
      ["pacienteNombre", "paciente", "nombrePaciente"],
      "Paciente",
    );
    const title =
      typeof patient === "object"
        ? (patient.nombre ?? patient.name ?? "Paciente")
        : patient;

    return [
      {
        id: appointment.id ?? appointment.idTurno ?? index,
        title: String(title),
        start,
        end: end <= start ? new Date(start.getTime() + 30 * 60 * 1000) : end,
        resource: appointment,
      },
    ];
  });
}
