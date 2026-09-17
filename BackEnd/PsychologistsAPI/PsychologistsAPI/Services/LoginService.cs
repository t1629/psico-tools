using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PsychologistsAPI.Entities;
using PsychologistsAPI.Models;
using Data.Context;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Linq;
using Microsoft.AspNetCore.Http.HttpResults;


//verificamos las credenciales y validamos 


namespace PsychologistsAPI.Services
{
    public class LoginService
    {
        private readonly IConfiguration _configuration;
        private readonly PsychologistContext _context;

        public LoginService(PsychologistContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
       




        public Task<String> VerificationLogin(Login login)
        {
            
            var _email = login.Email;
            var  _password = login.PasswordHash;
            if (_email == null || _password == null) return Task.FromResult<string?>(null);
            var _User = _context.Usuarios.FirstOrDefault(u => u.Email == _email && u.PasswordHash == _password);
            if (_User == null) return Task.FromResult<string?>(null);







            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, _User.UsuarioId.ToString()),
                new Claim(ClaimTypes.Email, _User.Email),
                new Claim(ClaimTypes.Name, _User.Nombre),
                new Claim(ClaimTypes.Role, _User.Rol)
            };


            var key = new SymmetricSecurityKey(
               Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!)
            );

            var credentials = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            );

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            return Task.FromResult<string?>(tokenString);


        }


    }  
}
