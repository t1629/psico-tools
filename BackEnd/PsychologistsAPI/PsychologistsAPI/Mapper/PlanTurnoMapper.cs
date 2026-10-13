using PsychologistsAPI.Models;
using PsychologistsAPI.Dtos;
using System.Numerics;

namespace PsychologistsAPI.Mapper
{
    public class PlanTurnoMapper
    {
        public static PlanTurnoDto ToDto(PlanTurno planTurno)
        {
            return new PlanTurnoDto
            {
                PlanTurnoId = planTurno.PlanTurnoId,
                FechaInicio = planTurno.FechaInicio,
                FehcaFin = planTurno.FehcaFin,
                CantidadTurno = planTurno.CantidadTurno,
                Pacientes = planTurno.Pacientes?.Select(p => new PacienteDto
                {
                     PacienteId = p.PacienteId,
                     Nombre = p.Nombre,
                     Apellido = p.Apellido
                }).ToList()
            };
        }
    }
}
