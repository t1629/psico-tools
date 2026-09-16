using System;
using System.Collections.Generic;

namespace Data.Entities;

public partial class TipoModalidad
{
    public int TipoModalidadId { get; set; }

    public bool ModalidadPresencial { get; set; }

    public bool ModalidadVirtual { get; set; }

    public virtual ICollection<Consultorio> Consultorios { get; set; } = new List<Consultorio>();
}
