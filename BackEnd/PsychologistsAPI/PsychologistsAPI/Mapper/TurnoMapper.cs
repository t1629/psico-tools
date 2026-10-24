using PsychologistsAPI.Models;
using PsychologistsAPI.Dtos;

namespace PsychologistsAPI.Mapper
{
    public class TurnoMapper
    {
        public static TurnoDto ToDto(Turno turno)
        {
            return new TurnoDto
            {
                TurnoId = turno.TurnoId,
                Fecha = turno.Fecha,
                Hora = turno.Hora,
                Estado = turno.Estado,
                Asistencia = turno.Asistencia,
                ModalidadVirtual = turno.ModalidadVirtual,
                Url = turno.Url,
                CantidadTurnos = turno.CantidadTurnos,
                PsicologoId = turno.PsicologoId,
                PsicologoNombre = turno.Psicologo?.Nombre,
                PsicologoApellido = turno.Psicologo?.Apellido,
                PacienteId = turno.PacienteId,
                PacienteNombre = turno.Paciente?.Nombre,
                PacienteApellido = turno.Paciente?.Apellido,
                PlanTurnoId = turno.PlanTurnoId,
                Descripcion = turno.Descripcion
            };
        }

        public static Turno ToEntity(TurnoDto dto)
        {
            return new Turno
            {
                TurnoId = dto.TurnoId,
                Fecha = dto.Fecha,
                Hora = dto.Hora,
                Estado = dto.Estado,
                Asistencia = dto.Asistencia,
                ModalidadVirtual = dto.ModalidadVirtual,
                Url = dto.Url,
                CantidadTurnos = dto.CantidadTurnos,
                PsicologoId = dto.PsicologoId,
                PacienteId = dto.PacienteId,
                PlanTurnoId = dto.PlanTurnoId, 
                Descripcion = dto.Descripcion
            };
        }


    }
}
