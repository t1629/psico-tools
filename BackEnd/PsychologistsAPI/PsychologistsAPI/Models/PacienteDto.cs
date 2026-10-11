
namespace PsychologistsAPI.Models
{
    public class PacienteDto
    {
        public int PacienteId { get; set; }

        public string? Nombre { get; set; }

        public string? Apellido { get; set; }

        public string? Telefono { get; set; }

        public string? Dni { get; set; }

        public string? Email { get; set; }

        // Nombre correcto en la API; la entidad conserva
        // su propiedad actual FechaNacimineto.
        public DateOnly? FechaNacimiento { get; set; }

        public string? NumeroPaciente { get; set; }

        public int? PlanTurnoId { get; set; }
    }
}
