using System;
using System.Collections.Generic;

namespace Data.Entities;

public partial class Turno
{
    public int TurnoId { get; set; }

    public DateOnly Fehca { get; set; }

    public TimeOnly Hora { get; set; }

    public string? Estado { get; set; }

    public int? Minutos { get; set; }

    public bool? Asistencia { get; set; }

    public string? Url { get; set; }

    public int? PsicologoId { get; set; }

    public int? PacienteId { get; set; }

    public int? PlanTurnoId { get; set; }

    public bool ModalidadVirtual { get; set; }

    public int? CantidadTurnos { get; set; }

    public virtual ICollection<Notificacion> Notificacions { get; set; } = new List<Notificacion>();

    public virtual Paciente? Paciente { get; set; }

    public virtual Psicologo? Psicologo { get; set; }
}
