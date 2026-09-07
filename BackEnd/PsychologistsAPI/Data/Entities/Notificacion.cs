using System;
using System.Collections.Generic;

namespace PsychologistsAPI.Entities;

public partial class Notificacion
{
    public int NotificacionoId { get; set; }

    public DateTime? FechaEnvio { get; set; }

    public int? IntentosEnvio { get; set; }

    public string? Estado { get; set; }

    public string? ResultadoEnvio { get; set; }

    public int TurnoId { get; set; }

    public int MedioEnvioId { get; set; }

    public virtual MedioEnvio MedioEnvio { get; set; } = null!;

    public virtual Turno Turno { get; set; } = null!;
}
