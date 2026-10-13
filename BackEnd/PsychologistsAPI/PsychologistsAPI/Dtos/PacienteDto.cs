namespace PsychologistsAPI.Dtos
{
    public class PacienteDto
    {
        public int PacienteId { get; set; }
        public string? Nombre { get; set; }

        public string? Apellido { get; set; }

        public string? Telefono { get; set; }

        public string? Email { get; set; }

        public string? Dni { get; set; }

        public DateOnly? FechaNacimineto { get; set; }

    }
}
