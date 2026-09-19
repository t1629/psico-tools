using System;
using System.Collections.Generic;

namespace Data.Entities;

public partial class PlanTurno
{
    public int PlanTurnoId { get; set; }

    public DateOnly FechaInicio { get; set; }

    public DateOnly FehcaFin { get; set; }

    public int? CantidadTurno { get; set; }

    public virtual ICollection<Paciente> Pacientes { get; set; } = new List<Paciente>();
}
