using Data.Context;
using Microsoft.AspNetCore.Http.HttpResults;
using PsychologistsAPI.Entities;
using PsychologistsAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace PsychologistsAPI.Services
{
    public class sessionService
    {
        private readonly PsychologistContext _context;
        private readonly IConfiguration _configuration;

        public sessionService(PsychologistContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }


        public sessionDto ValidateSession(ClaimsPrincipal user)
        {
            var userIdClaim = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var emailClaim = user.FindFirst(ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(userIdClaim))
                return null;

            int userId = int.Parse(userIdClaim);


            var usuario = _context.Usuarios.FirstOrDefault(u => u.UsuarioId == userId);

            if (usuario == null)
                return null;


            usuario.UltimoAcceso = DateOnly.FromDateTime(DateTime.Now);
            _context.SaveChanges();


            var dto = new sessionDto
            {
                UsuarioId = usuario.UsuarioId,
                Email = usuario.Email,
                UltimoAcceso = usuario.UltimoAcceso
            };

            return dto;
        }
    }
}
