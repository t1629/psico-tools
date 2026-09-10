using Data.Context;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PsychologistsAPI.Services;
using System.Text;

namespace PsychologistsAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            DotNetEnv.Env.Load();
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddAuthorization();

            builder.Services.AddScoped<LoginService>();
            builder.Services.AddScoped<sessionService>();


            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<PsychologistContext>(options =>
                options.UseSqlServer(connectionString));

           

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("DevPolicy", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("ProdPolicy", policy =>
                {
                    policy.WithOrigins(/* Aca luego ira el dominoio del frontEnd real */)   // Luego se rsmplaza y se hace esto por un tema de perimisos y seguridad
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
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
            
            options.Events = new Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerEvents
            {
                OnAuthenticationFailed = ctx =>
                {
                    // escribe el error en consola/log para depurar
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




            var app = builder.Build();
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseCors("DevPolicy");
            }
            else
            {
                app.UseCors("ProdPolicy");
            }

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}
