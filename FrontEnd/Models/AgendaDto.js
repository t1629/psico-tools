export class AgendaDto {
  constructor({
    agendaId = 0,
    psicologoId = 0,
    psicologoNombre = "",
    psicologoApellido = "",
    consultorioId = 1,
    diaSemana = "",
    horaInicio = "",
    horaFin = "",
    fecha = "",
    descripcion = "",
  } = {}) {
    this.agendaId = agendaId;
    this.psicologoId = psicologoId;
    this.psicologoNombre = psicologoNombre;
    this.psicologoApellido = psicologoApellido;
    this.consultorioId = consultorioId;
    this.diaSemana = diaSemana;
    this.horaInicio = horaInicio;
    this.horaFin = horaFin;
    this.fecha = fecha;
    this.descripcion = descripcion;
  }
}
