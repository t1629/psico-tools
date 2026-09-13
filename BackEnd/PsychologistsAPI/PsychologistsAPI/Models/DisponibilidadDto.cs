namespace PsychologistsAPI.Models
{
    public class DisponibilidadDto
    {
        public int DisponibilidadId { get; set; }

        public string? DiaSemana { get; set; }

        public TimeOnly HorarioInicio { get; set; }

        public TimeOnly HorarioFin { get; set; }

        public bool Activo { get; set; }

        public int PsicologoId { get; set; }
    }
}