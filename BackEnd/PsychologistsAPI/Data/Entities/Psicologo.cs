using System;
using System.Collections.Generic;

namespace PsychologistsAPI.Entities;

public partial class Psicologo
{
    public int PsicologoId { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Matricula { get; set; }

    public string? Apellido { get; set; }

    public string? Telefono { get; set; }

    public string? Email { get; set; }

    public int? UsuarioId { get; set; }

    public int? RolId { get; set; }

    public virtual ICollection<Agendum> Agenda { get; set; } = new List<Agendum>();

    public virtual ICollection<Disponibilidad> Disponibilidads { get; set; } = new List<Disponibilidad>();

    public virtual ICollection<PlanTurno> PlanTurnos { get; set; } = new List<PlanTurno>();

    public virtual Rol? Rol { get; set; }

    public virtual ICollection<Turno> Turnos { get; set; } = new List<Turno>();

    public virtual Usuario? Usuario { get; set; }
}
