using PsychologistsAPI.Data;
using PsychologistsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace PsychologistsAPI.Repositories
{
    public class TurnoRepository
    {
        private readonly PsychologistContext _context;

        public TurnoRepository(PsychologistContext context)
        {
            _context = context;
        }

        public async Task<List<Turno>> GetAllAsync()
        {
            return await _context.Turnos.ToListAsync();
        }

        public async Task<List<Turno>> GetByDateRangeAsync(DateOnly? desde, DateOnly? hasta)
        {
            var query = _context.Turnos.AsQueryable();

            if (desde.HasValue)
                query = query.Where(t => t.Fecha >= desde.Value);

            if (hasta.HasValue)
                query = query.Where(t => t.Fecha <= hasta.Value);

            return await query.ToListAsync();
        }

        public async Task<Turno?> GetByIdAsync(int id)
        {
            return await _context.Turnos
                .Include(t => t.Paciente)
                .Include(t => t.Psicologo)
                .Include(t => t.PlanTurno)
                .FirstOrDefaultAsync(t => t.TurnoId == id);
        }
        public async Task<Turno?> GetByIdWithPacienteAsync(int id)
        {
            return await _context.Turnos
                .Include(t => t.Paciente)
                .FirstOrDefaultAsync(t => t.TurnoId == id);
        }

        public async Task AddAsync(Turno turno)
        {
            _context.Turnos.Add(turno);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Turno turno)
        {
            _context.Turnos.Update(turno);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Turno turno)
        {
            _context.Turnos.Remove(turno);
            await _context.SaveChangesAsync();
        }
    }
}
