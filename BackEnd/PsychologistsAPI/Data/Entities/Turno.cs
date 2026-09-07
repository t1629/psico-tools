using System;
using System.Collections.Generic;

namespace PsychologistsAPI.Entities;

public partial class Turno
{
    public int TurnoId { get; set; }

    public DateOnly Fehca { get; set; }

    public TimeOnly Hora { get; set; }

    public string? Estado { get; set; }

    public int? Duarcion { get; set; }

    public string? TipoAsistencia { get; set; }

    public string? Url { get; set; }

    public int? PsicologoId { get; set; }

    public int? PacienteId { get; set; }

    public int? PlanTurnoId { get; set; }

    public int? ConsultorioId { get; set; }

    public virtual ICollection<Agendum> Agenda { get; set; } = new List<Agendum>();

    public virtual Consultorio? Consultorio { get; set; }

    public virtual ICollection<Notificacion> Notificacions { get; set; } = new List<Notificacion>();

    public virtual Paciente? Paciente { get; set; }

    public virtual PlanTurno? PlanTurno { get; set; }

    public virtual Psicologo? Psicologo { get; set; }
}
