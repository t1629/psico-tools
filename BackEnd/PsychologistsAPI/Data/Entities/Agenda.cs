using System;
using System.Collections.Generic;

namespace Data.Entities;

public partial class Agenda
{
    public int AgendaId { get; set; }

    public TimeOnly HoraInicio { get; set; }

    public TimeOnly HoraFin { get; set; }

    public string? DiaSemana { get; set; }

    public string? Estado { get; set; }

    public int PsicologoId { get; set; }

    public int ConsultorioId { get; set; }

    public virtual Consultorio Consultorio { get; set; } = null!;

    public virtual Psicologo Psicologo { get; set; } = null!;
}
