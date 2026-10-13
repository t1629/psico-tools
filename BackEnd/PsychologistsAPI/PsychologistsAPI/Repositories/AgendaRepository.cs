using Microsoft.EntityFrameworkCore;
using PsychologistsAPI.Data;
using PsychologistsAPI.Models;

namespace PsychologistsAPI.Repositories
{
    public class AgendaRepository
    {
        private readonly PsychologistContext _context;

        public AgendaRepository(PsychologistContext context)
        {
            _context = context;
        }

        public async Task<List<Agenda>> GetAllAsync()
        {
            return await _context.Agenda
                .Include(a => a.Psicologo)
                .ToListAsync();
        }

        public async Task<List<Agenda>> GetByDateAsync(DateOnly? fecha)
        {
            var query = _context.Agenda
                .Include(a => a.Psicologo)
                .AsQueryable();

            if (fecha.HasValue)
            {
                var diaSemana = fecha.Value.DayOfWeek.ToString();
                query = query.Where(a => a.DiaSemana == diaSemana);
            }

            return await query.ToListAsync();
        }

        public async Task<Agenda?> GetByIdAsync(int id)
        {
            return await _context.Agenda
                .Include(a => a.Psicologo)
                .FirstOrDefaultAsync(a => a.AgendaId == id);
        }
        public async Task<Agenda?> GetByIdWithPacienteAsync(int id)
        {
            return await _context.Agenda
                .Include(a => a.Psicologo)
                .FirstOrDefaultAsync(a => a.AgendaId == id);
        }

        public async Task AddAsync(Agenda agenda)
        {
            _context.Agenda.Add(agenda);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Agenda agenda)
        {
            _context.Agenda.Update(agenda);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Agenda agenda)
        {
            _context.Agenda.Remove(agenda);
            await _context.SaveChangesAsync();
        }
    }
}
