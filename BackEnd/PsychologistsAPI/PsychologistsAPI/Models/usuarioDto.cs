using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace PsychologistsAPI.Models
{
    public class usuarioDto
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es obligatorio.")]
        [RegularExpression("^[a-zA-Z\\s]+$", ErrorMessage = "El nombre solo puede contener letras y espacios.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "El email es obligatorio.")]
        [EmailAddress(ErrorMessage = "El email no tiene un formato válido.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "La contraseña es obligatoria.")]
        [MinLength(8, ErrorMessage = "La contraseña debe tener al menos 8 caracteres.")]
        public string PasswordHash { get; set; }

        public  bool Estado { get; set; }
       


    }
}
