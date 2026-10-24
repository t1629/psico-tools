namespace PsychologistsAPI.Dtos
{
    public class PlanTurnoDto
    {
        public int PlanTurnoId { get; set; }

        public DateOnly FechaInicio { get; set; }

        public DateOnly FechaFin { get; set; }

        public int? CantidadTurno { get; set; }

        public int? PsicologoId { get; set; }

        public List<PacienteDto>? Pacientes { get; set; }

    }
}