using System;
using System.Collections.Generic;

namespace PsychologistsAPI.Models;

public partial class Consultorio
{
    public int ConsultorioId { get; set; }

    public string? Nombre { get; set; }

    public string? Calle { get; set; }

    public int? Numero { get; set; }

    public int? TipoModalidadId { get; set; }

    public virtual ICollection<Agenda> Agenda { get; set; } = new List<Agenda>();

    public virtual TipoModalidad? TipoModalidad { get; set; }
}
