using System;
using System.Collections.Generic;

namespace Data.Entities;

public partial class TipoModalidad
{
    public int TipoModalidadId { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Consultorio> Consultorios { get; set; } = new List<Consultorio>();
}
