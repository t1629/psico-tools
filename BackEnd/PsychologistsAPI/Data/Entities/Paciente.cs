using System;
using System.Collections.Generic;

namespace Data.Entities;

public partial class Paciente
{
    public int PacienteId { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido { get; set; }

    public string? Telefono { get; set; }

    public string? Dni { get; set; }

    public string? Email { get; set; }

    public DateOnly? FechaNacimineto { get; set; }

    public string? NumeroPaciente { get; set; }

    public int? PlanTurnoId { get; set; }

    public virtual PlanTurno? PlanTurno { get; set; }

    public virtual ICollection<Turno> Turnos { get; set; } = new List<Turno>();
}
