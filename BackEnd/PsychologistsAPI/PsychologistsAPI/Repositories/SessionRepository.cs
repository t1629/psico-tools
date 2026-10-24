using PsychologistsAPI.Data;
using PsychologistsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace PsychologistsAPI.Repositories
{
    public class SessionRepository
    {
        private readonly PsyClinicDbContext _context;

        public SessionRepository(PsyClinicDbContext context)
        {
            _context = context;
        }

        public async Task<Usuario?> GetUserByIdAsync(int id)
        {
            return await _context.Usuarios.FirstOrDefaultAsync(u => u.UsuarioId == id);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
