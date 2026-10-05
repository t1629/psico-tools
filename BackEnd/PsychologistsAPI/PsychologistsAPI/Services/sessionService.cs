using PsychologistsAPI.Repositories;
using PsychologistsAPI.Dtos;
using System.Security.Claims;

namespace PsychologistsAPI.Services
{
    public class sessionService
    {
        private readonly SessionRepository _repo;

        public sessionService(SessionRepository repo)
        {
            _repo = repo;
        }

        public async Task<sessionDto?> ValidateSession(ClaimsPrincipal user)
        {
            var userIdClaim = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim)) return null;

            int userId = int.Parse(userIdClaim);
            var usuario = await _repo.GetUserByIdAsync(userId);
            if (usuario == null) return null;

            usuario.UltimoAcceso = DateOnly.FromDateTime(DateTime.Now);
            await _repo.SaveChangesAsync();

            return new sessionDto
            {
                UsuarioId = usuario.UsuarioId,
                Email = usuario.Email,
                UltimoAcceso = usuario.UltimoAcceso
            };
        }
    }
}
