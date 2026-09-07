using System;
using System.Collections.Generic;

namespace PsychologistsAPI.Entities;

public partial class PlanTurno
{
    public int PlanTurnoId { get; set; }

    public DateOnly FechaInicio { get; set; }

    public DateOnly FehcaFin { get; set; }

    public int? CantidadTurno { get; set; }

    public int? PsicologoId { get; set; }

    public int? PacienteId { get; set; }

    public virtual Paciente? Paciente { get; set; }

    public virtual Psicologo? Psicologo { get; set; }

    public virtual ICollection<Turno> Turnos { get; set; } = new List<Turno>();
}
