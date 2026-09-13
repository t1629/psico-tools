namespace PsychologistsAPI.Models
{
    public class AgendaDto
    {
        public int AgendaId { get; set; }

        public int ConsultorioId { get; set; }

        public string? DiaSemana { get; set; }

        public int DisponibilidadId { get; set; }

        public string? Estado { get; set; }

        public TimeOnly HoraInicio { get; set; }

        public TimeOnly HoraFin { get; set; }

        public int PsicologoId { get; set; }

        public int TurnoId { get; set; }
    }
}