namespace PsychologistsAPI.Models
{
    public class sessionDto
    {
        public int UsuarioId { get; set; }

        public string Nombre { get; set; }

        public string Email { get; set; }

        public DateOnly? UltimoAcceso { get; set; }
    }
}
