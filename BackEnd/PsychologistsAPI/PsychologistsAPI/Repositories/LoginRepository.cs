using PsychologistsAPI.Data;
using PsychologistsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace PsychologistsAPI.Repositories
{
    public class LoginRepository
    {
        private readonly PsychologistContext _context;

        public LoginRepository(PsychologistContext context)
        {
            _context = context;
        }

        public async Task<Usuario?> GetUserByCredentialsAsync(string email, string password)
        {
            return await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == email && u.PasswordHash == password);
        }
    }
}
