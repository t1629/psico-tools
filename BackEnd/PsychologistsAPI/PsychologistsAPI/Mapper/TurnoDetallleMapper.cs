using Data.Entities;
using PsychologistsAPI.Models;

namespace PsychologistsAPI.Mapper
{
    public class TurnoDetallleMapper
    {
        public static TurnoDetalleDto ToDetalleDto(Turno turno)
        {
            return new TurnoDetalleDto
            {
                TurnoId = turno.TurnoId,
                Fecha = turno.Fecha,
                Hora = turno.Hora,
                Estado = turno.Estado,
                Asistencia = turno.Asistencia,
                Url = turno.Url,
                Descripcion = turno.Descripcion,
                Paciente = PacienteMapper.ToDto(turno.Paciente),
                Psicologo = PsicologoMapper.ToDto(turno.Psicologo),
                PlanTurno = PlanTurnoMapper.ToDto(turno.PlanTurno)
            };
        }

    }
}
