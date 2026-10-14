using PsychologistsAPI.Data;
using PsychologistsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace PsychologistsAPI.Repositories
{
    public class PsicologoRepository
    {
        private readonly PsyClinicDbContext _context;

        public PsicologoRepository(PsyClinicDbContext context)
        {
            _context = context;
        }

        public async Task<List<Psicologo>> GetAllAsync()
        {
            return await _context.Psicologos.ToListAsync();
        }

        public async Task<Psicologo> GetByIdAsync(int id)
        {
            return await _context.Psicologos.FirstOrDefaultAsync();
        }


        public async Task AddAsync(Psicologo psicologo)
        {
             _context.Psicologos.Add(psicologo);

             await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Psicologo psicologo)
        {
            _context.Psicologos.Update(psicologo);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Psicologo psicologo)
        {
            _context.Psicologos.Remove(psicologo);

            await _context.SaveChangesAsync();
        }

    }
}
