namespace PsychologistsAPI.Models
{
    public class PlanTurnoDto
    {
        public int PlanTurnoId { get; set; }

        public DateOnly FechaInicio { get; set; }

        public DateOnly FehcaFin { get; set; }

        public int? CantidadTurno { get; set; }

        public int? PsicologoId { get; set; }

        public int? PacienteId { get; set; }
    }
}