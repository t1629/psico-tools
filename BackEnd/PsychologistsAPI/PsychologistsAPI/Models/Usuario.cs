using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace PsychologistsAPI.Models;

[Table("usuario")]
public partial class Usuario
{
    public int UsuarioId { get; set; }

    public string Nombre { get; set; } = null!;

    public string Rol { get; set; } = null!;

    public string Email { get; set; } = null!;

    [Column("password")]
    public string PasswordHash { get; set; } = null!;

    public DateOnly FechaIngreso { get; set; }

    public DateOnly? UltimoAcceso { get; set; }

    public bool Estado { get; set; }

    public virtual ICollection<Psicologo> Psicologos { get; set; } = new List<Psicologo>();
}
