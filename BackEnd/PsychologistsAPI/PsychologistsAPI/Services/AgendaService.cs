using Data.Context;
using Microsoft.EntityFrameworkCore;
using Data.Entities;
using PsychologistsAPI.Models;
using PsychologistsAPI.Mapper;

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
            var agendas = await _context.Agenda
                .Include(a => a.Psicologo) 
                .ToListAsync();

            return agendas.Select(a => AgendaMapper.ToDto(a)).ToList();
        }

        public async Task<List<AgendaDto>> GetByDate(DateOnly? fecha)
        {
            var query = _context.Agenda
                .Include(a => a.Psicologo) 
                .AsQueryable();

            // Por ahora la entidad Agenda trabaja con DiaSemana.
            // El filtro por fecha se podrá ajustar cuando se defina
            // la lógica completa de agenda/disponibilidad.

            var agendas = await query.ToListAsync();
            return agendas.Select(a => AgendaMapper.ToDto(a)).ToList();
        }

        public async Task<AgendaDto?> GetById(int id)
        {
            var agenda = await _context.Agenda
                .Include(a => a.Psicologo) 
                .FirstOrDefaultAsync(a => a.AgendaId == id);

            if (agenda == null)
                return null;

            return AgendaMapper.ToDto(agenda);
        }

        public async Task<AgendaDto?> GetByIdWithPaciente(int id)
        {
            var agenda = await _context.Agenda
                .Include(a => a.Psicologo) 
                .FirstOrDefaultAsync(a => a.AgendaId == id);

            if (agenda == null)
                return null;

            return AgendaMapper.ToDto(agenda);
        }

        public async Task<AgendaDto> Create(AgendaDto dto)
        {
            if (dto.HoraInicio >= dto.HoraFin)
            {
                throw new ArgumentException(
                    "La hora de inicio debe ser anterior a la hora de fin."
                );
            }

            var agenda = AgendaMapper.ToEntity(dto);

            _context.Agenda.Add(agenda);
            await _context.SaveChangesAsync();

            
            agenda = await _context.Agenda
                .Include(a => a.Psicologo)
                .FirstAsync(a => a.AgendaId == agenda.AgendaId);

            return AgendaMapper.ToDto(agenda);
        }

        public async Task<AgendaDto?> Update(AgendaDto dto)
        {
            var agenda = await _context.Agenda
                .Include(a => a.Psicologo)
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
            agenda.Estado = dto.Estado;
            agenda.HoraInicio = dto.HoraInicio;
            agenda.HoraFin = dto.HoraFin;
            agenda.PsicologoId = dto.PsicologoId;
            

            await _context.SaveChangesAsync();

            return AgendaMapper.ToDto(agenda);
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
    }
}
