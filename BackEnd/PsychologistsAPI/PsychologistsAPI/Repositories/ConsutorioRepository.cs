using PsychologistsAPI.Models;
using Microsoft.EntityFrameworkCore;
using PsychologistsAPI.Data;

namespace PsychologistsAPI.Repositories
{
    public class ConsultorioRepository
    {
        private readonly PsyClinicDbContext _context;

        public ConsultorioRepository(PsyClinicDbContext context)
        {
            _context = context;
        }

        public async Task<List<Consultorio>> GetAllAsync()
        {
            return await _context.Consultorios
                .Include(c => c.TipoModalidad)
                .ToListAsync();
        }

        public async Task<Consultorio?> GetByIdAsync(int id)
        {
            return await _context.Consultorios
                .Include(c => c.TipoModalidad)
                .FirstOrDefaultAsync(c => c.ConsultorioId == id);
        }

        public async Task AddAsync(Consultorio consultorio)
        {
            _context.Consultorios.Add(consultorio);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Consultorio consultorio)
        {
            _context.Consultorios.Update(consultorio);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var consultorio = await _context.Consultorios.FindAsync(id);
            if (consultorio != null)
            {
                _context.Consultorios.Remove(consultorio);
                await _context.SaveChangesAsync();
            }
        }
    }
}
