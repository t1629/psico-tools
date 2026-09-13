namespace PsychologistsAPI.Models
{
    public class TurnoDto
    {
        public int TurnoId { get; set; }

        public DateOnly Fehca { get; set; }

        public TimeOnly Hora { get; set; }

        public string? Estado { get; set; }

        public int? Duarcion { get; set; }

        public string? TipoAsistencia { get; set; }

        public string? Url { get; set; }

        public int? PsicologoId { get; set; }

        public int? PacienteId { get; set; }

        public int? PlanTurnoId { get; set; }

        public int? ConsultorioId { get; set; }
    }
}