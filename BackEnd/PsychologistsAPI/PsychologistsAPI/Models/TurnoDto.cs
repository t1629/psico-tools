namespace PsychologistsAPI.Models
{
    public class TurnoDto
    {
        public int TurnoId { get; set; }

        public DateOnly Fehca { get; set; }

        public TimeOnly Hora { get; set; }

        public string? Estado { get; set; }

        public int? Minutos { get; set; }

        public bool? Asistencia { get; set; }

        public string? Url { get; set; }

        public int? PsicologoId { get; set; }

        public int? PacienteId { get; set; }

        public bool ModalidadVirtual { get; set; }

        public int? CantidadTurnos { get; set; }

        public string? Descripcion { get; set; }

    }
}