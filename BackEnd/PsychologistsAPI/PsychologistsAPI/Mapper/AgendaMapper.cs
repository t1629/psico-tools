using Data.Entities;
using Data.Entities;
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
                HoraFin = entity.HoraFin,
                Fecha = CalcularFechaDesdeDiaSemana(entity.DiaSemana)
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

        private static string CalcularFechaDesdeDiaSemana(string diaSemana)
        {
            var dias = new[] { "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado" };
            var today = DateTime.Today;
            var targetDay = Array.IndexOf(dias, diaSemana);
            var diff = (targetDay - (int)today.DayOfWeek + 7) % 7;
            var fecha = today.AddDays(diff);
            return fecha.ToString("yyyy-MM-dd"); 
        }
    }

}
