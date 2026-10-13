using Data.Context;
using Data.Entities;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using PsychologistsAPI.Services;
using System.Text;

namespace PsychologistsAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Cargar variables de entorno desde .env.backend
            DotNetEnv.Env.Load(".env.backend");

            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Configurar CORS unificado
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllPolicy", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader()
                          .WithExposedHeaders("Authorization");
                });
            });

            // Registrar Servicios de la aplicación
            builder.Services.AddScoped<LoginService>();
            builder.Services.AddScoped<sessionService>();
            builder.Services.AddScoped<TurnoService>();
            builder.Services.AddScoped<AgendaService>();
            builder.Services.AddScoped<PlanTurnoService>();
            builder.Services.AddScoped<usuarioService>();

            // Configurar SQL Server con la cadena de conexión
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
                                  ?? Environment.GetEnvironmentVariable("DefaultConnection");

            builder.Services.AddDbContext<PsychologistContext>(options =>
                options.UseSqlServer(connectionString));

            // Configurar Autenticación JWT
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)
                        )
                    };

                    options.Events = new JwtBearerEvents
                    {
                        OnAuthenticationFailed = ctx =>
                        {
                            Console.WriteLine("Auth failed: " + ctx.Exception?.Message);
                            return Task.CompletedTask;
                        },
                        OnMessageReceived = ctx =>
                        {
                            Console.WriteLine("Token received: " + (ctx.Token?.Substring(0, Math.Min(20, ctx.Token.Length)) ?? "null"));
                            return Task.CompletedTask;
                        },
                        OnTokenValidated = ctx =>
                        {
                            Console.WriteLine("Token valid for: " + ctx.Principal?.Identity?.Name);
                            return Task.CompletedTask;
                        }
                    };
                });

            builder.Services.AddAuthorization();

            var app = builder.Build();

            // 1. IMPORTANTE: Activar CORS al principio del pipeline
            app.UseCors("AllowAllPolicy");

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}