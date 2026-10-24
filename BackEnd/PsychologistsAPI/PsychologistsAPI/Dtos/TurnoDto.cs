using PsychologistsAPI.Models;

namespace PsychologistsAPI.Dtos
{
    public class TurnoDto
    {
        public int TurnoId { get; set; }
        public DateOnly Fecha { get; set; }
        public TimeOnly Hora { get; set; }
        public string? Estado { get; set; }
        public int? Minutos { get; set; }
        public bool? Asistencia { get; set; }
        public string? Url { get; set; }
        public bool ModalidadVirtual { get; set; }
        public int? CantidadTurnos { get; set; }
        public string? Descripcion { get; set; }

        public int? PsicologoId { get; set; }
        public string? PsicologoNombre { get; set; }
        public string? PsicologoApellido { get; set; }

        public int? PacienteId { get; set; }
        public string? PacienteNombre { get; set; }
        public string? PacienteApellido { get; set; }

        public int? PlanTurnoId { get; set; }
        public string? PlanTurnoNombre { get; set; }



    }
}