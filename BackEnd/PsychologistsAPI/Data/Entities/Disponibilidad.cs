using System;
using System.Collections.Generic;

namespace PsychologistsAPI.Entities;

public partial class Disponibilidad
{
    public int DisponibilidadId { get; set; }

    public string? DiaSemana { get; set; }

    public TimeOnly HorarioInicio { get; set; }

    public TimeOnly HorarioFin { get; set; }

    public bool Activo { get; set; }

    public int PsicologoId { get; set; }

    public virtual ICollection<Agendum> Agenda { get; set; } = new List<Agendum>();

    public virtual Psicologo Psicologo { get; set; } = null!;
}
