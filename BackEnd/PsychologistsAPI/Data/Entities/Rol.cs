using System;
using System.Collections.Generic;

namespace PsychologistsAPI.Entities;

public partial class Rol
{
    public int RolId { get; set; }

    public string? Nombre { get; set; }

    public virtual ICollection<Psicologo> Psicologos { get; set; } = new List<Psicologo>();
}
