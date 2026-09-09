using System.ComponentModel.DataAnnotations;

namespace PsychologistsAPI.Models
{
    public class usuarioDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required]
        public bool Estado { get; set; }


    }
}
