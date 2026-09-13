using Data.Context;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PsychologistsAPI.Entities;
using PsychologistsAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ExceptionServices;
using System.Text;

namespace PsychologistsAPI.Services
{
    
    public class usuarioService 
    {
        private readonly PsychologistContext _context;
        public usuarioService(PsychologistContext context)
        {
            _context = context;
        }

        public async Task<usuarioDto?> getUser(int id)
        {
            var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.UsuarioId == id);

            if (user == null)

                return null;

            var dto = new usuarioDto
            {
                Name = user.Nombre,
                Email = user.Email,
                Estado = user.Estado

            };

            return dto;

        }


        public async Task<usuarioDto?> postUser(usuarioDto dto)
        {

            var userValid = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (userValid != null)
            {
                throw new InvalidOperationException("El email ya está registrado.");
            }

            var user = new Usuario
            {
               Nombre = dto.Name,
               PasswordHash = dto.PasswordHash,
               Email = dto.Email,

            };

            _context.Usuarios.Add(user);
            await _context.SaveChangesAsync();


            return new usuarioDto
            {
                Id = user.UsuarioId,
                Name = user.Nombre,
                Email = user.Email,
                Estado = user.Estado
            };

        }
    }
}
