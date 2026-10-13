using PsychologistsAPI.Data;
using PsychologistsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace PsychologistsAPI.Repositories
{
    public class PlanTurnoRepository
    {
        private readonly PsychologistContext _context;

        public PlanTurnoRepository(PsychologistContext context)
        {
            _context = context;
        }

        public async Task<List<PlanTurno>> GetAllAsync()
        {
            return await _context.PlanTurnos.ToListAsync();
        }

        public async Task<PlanTurno?> GetByIdAsync(int id)
        {
            return await _context.PlanTurnos.FirstOrDefaultAsync(p => p.PlanTurnoId == id);
        }

        public async Task AddAsync(PlanTurno plan)
        {
            _context.PlanTurnos.Add(plan);
            await _context.SaveChangesAsync();
        }
        public async Task<PlanTurno?> GetByIdWithPacienteAsync(int id)
        {
            return await _context.PlanTurnos
                .Include(p => p.Pacientes) // si tu entidad tiene relación con Pacientes
                .FirstOrDefaultAsync(p => p.PlanTurnoId == id);
        }

        public async Task UpdateAsync(PlanTurno plan)
        {
            _context.PlanTurnos.Update(plan);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(PlanTurno plan)
        {
            _context.PlanTurnos.Remove(plan);
            await _context.SaveChangesAsync();
        }
    }
}
