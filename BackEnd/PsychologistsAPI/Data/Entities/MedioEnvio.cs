using System;
using System.Collections.Generic;

namespace PsychologistsAPI.Entities;

public partial class MedioEnvio
{
    public int MedioEnvioId { get; set; }

    public string? Nombre { get; set; }

    public virtual ICollection<Notificacion> Notificacions { get; set; } = new List<Notificacion>();
}
