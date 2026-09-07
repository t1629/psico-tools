using System;
using System.Collections.Generic;

namespace PsychologistsAPI.Entities;

public partial class Consultorio
{
    public int ConsultorioId { get; set; }

    public string? Nomrbe { get; set; }

    public string? Calle { get; set; }

    public int? Nuemro { get; set; }

    public virtual ICollection<Agendum> Agenda { get; set; } = new List<Agendum>();

    public virtual ICollection<Turno> Turnos { get; set; } = new List<Turno>();
}
