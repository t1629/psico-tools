using PsychologistsAPI.Entities;
using PsychologistsAPI.Models;

namespace PsychologistsAPI.Mapper
{
    public class AgendaMapper
    {
        public static AgendaDto ToDto(Agenda entity)
        {
            return new AgendaDto
            {
                AgendaId = entity.AgendaId,
                PsicologoId = entity.PsicologoId,
                PsicologoNombre = entity.Psicologo?.Nombre,
                PsicologoApellido = entity.Psicologo?.Apellido,
                ConsultorioId = entity.ConsultorioId,
                DiaSemana = entity.DiaSemana,
                HoraInicio = entity.HoraInicio,
                HoraFin = entity.HoraFin
            };
        }

        public static Agenda ToEntity(AgendaDto dto)
        {
            return new Agenda
            {
                AgendaId = dto.AgendaId,
                PsicologoId = dto.PsicologoId,
                ConsultorioId = dto.ConsultorioId,
                DiaSemana = dto.DiaSemana,
                HoraInicio = dto.HoraInicio,
                HoraFin = dto.HoraFin
                
            };
        }
    }

}
