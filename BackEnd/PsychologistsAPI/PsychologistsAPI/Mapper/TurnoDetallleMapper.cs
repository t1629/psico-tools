using PsychologistsAPI.Models;
using PsychologistsAPI.Dtos;

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

                Minutos = turno.Minutos,
                ModalidadVirtual = turno.ModalidadVirtual,
                CantidadTurnos = turno.CantidadTurnos,

                Asistencia = turno.Asistencia,
                Url = turno.Url,
                Descripcion = turno.Descripcion,

                Paciente = turno.Paciente != null
         ? PacienteMapper.ToDto(turno.Paciente)
         : null,

                Psicologo = turno.Psicologo != null
         ? PsicologoMapper.ToDto(turno.Psicologo)
         : null,

                PlanTurno = turno.PlanTurno != null
         ? PlanTurnoMapper.ToDto(turno.PlanTurno)
         : null
            };
        }

    }
}
