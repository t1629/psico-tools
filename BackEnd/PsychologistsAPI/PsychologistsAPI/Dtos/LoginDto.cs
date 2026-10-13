using System.ComponentModel.DataAnnotations;

namespace PsychologistsAPI.Models
{
    public class Login
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }
    }
}
