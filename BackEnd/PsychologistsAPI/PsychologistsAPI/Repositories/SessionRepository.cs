using PsychologistsAPI.Data;
using PsychologistsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace PsychologistsAPI.Repositories
{
    public class SessionRepository
    {
        private readonly PsychologistContext _context;

        public SessionRepository(PsychologistContext context)
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
