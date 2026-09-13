using Data.Context;
using Microsoft.EntityFrameworkCore;
using PsychologistsAPI.Entities;
using PsychologistsAPI.Models;

namespace PsychologistsAPI.Services
{
    public class AgendaService
    {
        private readonly PsychologistContext _context;

        public AgendaService(PsychologistContext context)
        {
            _context = context;
        }

        public async Task<List<AgendaDto>> GetAll()
        {
            return await _context.Agenda
                .Select(a => MapToDto(a))
                .ToListAsync();
        }

        public async Task<List<AgendaDto>> GetByDate(DateOnly? fecha)
        {
            var query = _context.Agenda.AsQueryable();

            // Por ahora la entidad Agenda trabaja con DiaSemana.
            // El filtro por fecha se podrá ajustar cuando se defina
            // la lógica completa de agenda/disponibilidad.

            return await query
                .Select(a => MapToDto(a))
                .ToListAsync();
        }

        public async Task<AgendaDto?> GetById(int id)
        {
            var agenda = await _context.Agenda
                .FirstOrDefaultAsync(a => a.AgendaId == id);

            if (agenda == null)
                return null;

            return MapToDto(agenda);
        }

        public async Task<AgendaDto?> GetByIdWithPaciente(int id)
        {
            var agenda = await _context.Agenda
                .Include(a => a.Turno)
                .ThenInclude(t => t!.Paciente)
                .FirstOrDefaultAsync(a => a.AgendaId == id);

            if (agenda == null)
                return null;

            return MapToDto(agenda);
        }

        public async Task<AgendaDto> Create(AgendaDto dto)
        {
            if (dto.HoraInicio >= dto.HoraFin)
            {
                throw new ArgumentException(
                    "La hora de inicio debe ser anterior a la hora de fin."
                );
            }

            var agenda = new Agendum
            {
                ConsultorioId = dto.ConsultorioId,
                DiaSemana = dto.DiaSemana,
                DisponibilidadId = dto.DisponibilidadId,
                Estado = dto.Estado,
                HoraInicio = dto.HoraInicio,
                HoraFin = dto.HoraFin,
                PsicologoId = dto.PsicologoId,
                TurnoId = dto.TurnoId
            };

            _context.Agenda.Add(agenda);

            await _context.SaveChangesAsync();

            return MapToDto(agenda);
        }

        public async Task<AgendaDto?> Update(AgendaDto dto)
        {
            var agenda = await _context.Agenda
                .FirstOrDefaultAsync(a => a.AgendaId == dto.AgendaId);

            if (agenda == null)
                return null;

            if (dto.HoraInicio >= dto.HoraFin)
            {
                throw new ArgumentException(
                    "La hora de inicio debe ser anterior a la hora de fin."
                );
            }

            agenda.ConsultorioId = dto.ConsultorioId;
            agenda.DiaSemana = dto.DiaSemana;
            agenda.DisponibilidadId = dto.DisponibilidadId;
            agenda.Estado = dto.Estado;
            agenda.HoraInicio = dto.HoraInicio;
            agenda.HoraFin = dto.HoraFin;
            agenda.PsicologoId = dto.PsicologoId;
            agenda.TurnoId = dto.TurnoId;

            await _context.SaveChangesAsync();

            return MapToDto(agenda);
        }

        public async Task<bool> Delete(int id)
        {
            var agenda = await _context.Agenda
                .FirstOrDefaultAsync(a => a.AgendaId == id);

            if (agenda == null)
                return false;

            _context.Agenda.Remove(agenda);

            await _context.SaveChangesAsync();

            return true;
        }

        private static AgendaDto MapToDto(Agendum agenda)
        {
            return new AgendaDto
            {
                AgendaId = agenda.AgendaId,
                ConsultorioId = agenda.ConsultorioId,
                DiaSemana = agenda.DiaSemana,
                DisponibilidadId = agenda.DisponibilidadId,
                Estado = agenda.Estado,
                HoraInicio = agenda.HoraInicio,
                HoraFin = agenda.HoraFin,
                PsicologoId = agenda.PsicologoId,
                TurnoId = agenda.TurnoId
            };
        }
    }
}