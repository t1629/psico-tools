using System;
using System.Collections.Generic;

namespace PsychologistsAPI.Models;

public partial class Agenda
{
    public int AgendaId { get; set; }

    public TimeOnly HoraInicio { get; set; }

    public TimeOnly HoraFin { get; set; }

    public string? Estado { get; set; }

    public int PsicologoId { get; set; }

    public int ConsultorioId { get; set; }

    public int? PacienteId { get; set; }

    public string? Descripcion { get; set; }

    public string? Titulo { get; set; }

    public DateOnly? Fecha { get; set; }

    public virtual Consultorio Consultorio { get; set; } = null!;

    public virtual Paciente? Paciente { get; set; }

    public virtual Psicologo Psicologo { get; set; } = null!;
}
