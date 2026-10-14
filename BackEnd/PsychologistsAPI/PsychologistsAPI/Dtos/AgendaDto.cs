namespace PsychologistsAPI.Dtos
{
    public class AgendaDto
    {
        public int AgendaId { get; set; }

        public int ConsultorioId { get; set; }
        public string? ConsultorioNombre { get; set; }

        public string? DiaSemana { get; set; }


        public string? Estado { get; set; }

        public TimeOnly HoraInicio { get; set; }

        public TimeOnly HoraFin { get; set; }
        public string? Descripcion { get; set; }
        public string? Titulo { get; set; }
        public int PsicologoId { get; set; }
        public int? PacienteId { get; set; }
        public string? PacienteNombre { get; set; }
        public string? PacienteApellido { get; set; }



    }
}