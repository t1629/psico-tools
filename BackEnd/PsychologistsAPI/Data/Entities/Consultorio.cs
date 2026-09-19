using System;
using System.Collections.Generic;

namespace Data.Entities;

public partial class Consultorio
{
    public int ConsultorioId { get; set; }

    public string? Nomrbe { get; set; }

    public string? Calle { get; set; }

    public int? Nuemro { get; set; }

    public bool? Presencial { get; set; }

    public bool? Virtual { get; set; }

    public int? TipoModalidadId { get; set; }

    public virtual ICollection<Agendum> Agenda { get; set; } = new List<Agendum>();

    public virtual TipoModalidad? TipoModalidad { get; set; }
}
