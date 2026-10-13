using PsychologistsAPI.Repositories;
using PsychologistsAPI.Dtos;
using PsychologistsAPI.Models;

namespace PsychologistsAPI.Services
{
    public class usuarioService
    {
        private readonly UsuarioRepository _repo;

        public usuarioService(UsuarioRepository repo)
        {
            _repo = repo;
        }

        public async Task<usuarioDto?> getUser(int id)
        {
            var user = await _repo.GetByIdAsync(id);
            if (user == null) return null;

            return new usuarioDto
            {
                Name = user.Nombre,
                Email = user.Email,
                Estado = user.Estado
            };
        }

        public async Task<usuarioDto?> postUser(usuarioDto dto)
        {
            var userValid = await _repo.GetByEmailAsync(dto.Email);
            if (userValid != null)
                throw new InvalidOperationException("El email ya está registrado.");

            var user = new Usuario
            {
                Nombre = dto.Name,
                PasswordHash = dto.PasswordHash,
                Email = dto.Email,
                Estado = true
            };

            await _repo.AddAsync(user);

            return new usuarioDto
            {
                Id = user.UsuarioId,
                Name = user.Nombre,
                Email = user.Email,
                Estado = user.Estado
            };
        }

        public async Task<usuarioDto?> putUser(usuarioDto dto, int id)
        {
            var user = await _repo.GetByIdAsync(id);
            if (user == null) return null;

            if (!dto.Email.Contains("@"))
                throw new ArgumentException("El email no tiene un formato válido.");

            user.Nombre = dto.Name;
            user.Email = dto.Email;
            user.PasswordHash = dto.PasswordHash;

            await _repo.UpdateAsync(user);

            return new usuarioDto
            {
                Name = user.Nombre,
                Email = user.Email,
                PasswordHash = user.PasswordHash
            };
        }

        public async Task<bool> softDeleteUser(int id)
        {
            var user = await _repo.GetByIdAsync(id);
            if (user == null) return false;

            user.Estado = false;
            await _repo.SaveChangesAsync();

            return true;
        }
    }
}
