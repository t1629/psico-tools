namespace PsychologistsAPI.Models
{
    public class PsicologoDto
    {
        public int PsicologoId { get; set; }
        public string Nombre { get; set; }

        public string Apellido { get; set; }

        public string? Telefono { get; set; }

        public string? Email { get; set; }

    }
}
