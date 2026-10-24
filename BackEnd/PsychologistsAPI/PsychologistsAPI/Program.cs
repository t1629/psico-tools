
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using PsychologistsAPI.Data;
using PsychologistsAPI.Repositories;
using PsychologistsAPI.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// 1. Cargar variables de entorno
var envPath = Path.Combine(
    builder.Environment.ContentRootPath,
    ".env.backend"
);

if (!File.Exists(envPath))
{
    envPath = Path.Combine(
        AppContext.BaseDirectory,
        ".env.backend"
    );
}

if (File.Exists(envPath))
{
    Env.Load(envPath);
}
else
{
    Console.WriteLine(
        "ADVERTENCIA: No se encontro .env.backend."
    );
}

builder.Configuration.AddEnvironmentVariables();

// 2. Controladores y Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition(
        "Bearer",
        new OpenApiSecurityScheme
        {
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Description = "Ingresá el token JWT obtenido mediante POST /api/login."
        }
    );

    options.AddSecurityRequirement(document =>
        new OpenApiSecurityRequirement
        {
            [
                new OpenApiSecuritySchemeReference("Bearer", document)
            ] = new List<string>()
        }
    );
});

// 3. Contexto de base de datos
var connectionString =
    builder.Configuration["DB_CONNECTION_STRING"];

if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new InvalidOperationException(
        "Falta DB_CONNECTION_STRING. Verifica la configuracion de .env.backend."
    );
}

builder.Services.AddDbContext<PsyClinicDbContext>(
    options => options.UseSqlServer(connectionString)
);

// 4. Servicios
builder.Services.AddScoped<LoginService>();
builder.Services.AddScoped<sessionService>();
builder.Services.AddScoped<TurnoService>();
builder.Services.AddScoped<AgendaService>();
builder.Services.AddScoped<PlanTurnoService>();
builder.Services.AddScoped<usuarioService>();
builder.Services.AddScoped<PacienteService>();
builder.Services.AddScoped<PsicologoService>();
builder.Services.AddScoped<ConsultorioService>();

// 5. Repositorios
builder.Services.AddScoped<AgendaRepository>();
builder.Services.AddScoped<LoginRepository>();
builder.Services.AddScoped<PlanTurnoRepository>();
builder.Services.AddScoped<SessionRepository>();
builder.Services.AddScoped<TurnoRepository>();
builder.Services.AddScoped<UsuarioRepository>();
builder.Services.AddScoped<ConsultorioRepository>();
builder.Services.AddScoped<PsicologoRepository>();
builder.Services.AddScoped<PacienteRepository>();

// 6. CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevPolicy", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });

    options.AddPolicy("ReactNativeDev", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod()
            .WithExposedHeaders("Authorization");
    });

    options.AddPolicy("ProdPolicy", policy =>
    {
        policy
            .WithOrigins("https://tu-dominio.com")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// 7. Configuracion JWT
var jwtKey = builder.Configuration["Jwt:Key"];
var jwtIssuer = builder.Configuration["Jwt:Issuer"];
var jwtAudience = builder.Configuration["Jwt:Audience"];

if (string.IsNullOrWhiteSpace(jwtKey) ||
    string.IsNullOrWhiteSpace(jwtIssuer) ||
    string.IsNullOrWhiteSpace(jwtAudience))
{
    throw new InvalidOperationException(
        "Falta configuracion JWT. Verifica Jwt__Key, Jwt__Issuer y Jwt__Audience."
    );
}

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtIssuer,
                ValidAudience = jwtAudience,
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(jwtKey)
                )
            };

        if (builder.Environment.IsDevelopment())
        {
            options.Events = new JwtBearerEvents
            {
                OnAuthenticationFailed = context =>
                {
                    Console.WriteLine(
                        $"Error de autenticacion: {context.Exception.Message}"
                    );
                    return Task.CompletedTask;
                }
            };
        }
    });

builder.Services.AddAuthorization();

// 8. Construir la aplicacion
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(
    app.Environment.IsDevelopment()
        ? "DevPolicy"
        : "ProdPolicy"
);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
