
using Data.Context;
using Data.Entities;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using PsychologistsAPI.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// --------------------------------------------------
// 1. Cargar variables de entorno
// --------------------------------------------------

// Buscar .env.backend en el directorio de trabajo.
// Si no existe allí, intentar localizarlo desde el
// directorio del proyecto.
var envPath = Path.Combine(
    Directory.GetCurrentDirectory(),
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
        "ADVERTENCIA: No se encontró .env.backend."
    );
}

// Incorporar las variables de entorno a IConfiguration.
// Las variables Jwt__Key, Jwt__Issuer y Jwt__Audience
// se leen como Jwt:Key, Jwt:Issuer y Jwt:Audience.
builder.Configuration.AddEnvironmentVariables();

// --------------------------------------------------
// 2. Controladores
// --------------------------------------------------

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// --------------------------------------------------
// 3. Swagger + JWT
// --------------------------------------------------

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
            Description =
                "Ingresá el token JWT obtenido mediante POST /api/login."
        }
    );

    options.AddSecurityRequirement(document =>
        new OpenApiSecurityRequirement
        {
            [
                new OpenApiSecuritySchemeReference(
                    "Bearer",
                    document
                )
            ] = new List<string>()
        }
    );
});

// --------------------------------------------------
// 4. Autorización
// --------------------------------------------------

builder.Services.AddAuthorization();

// --------------------------------------------------
// 5. Servicios
// --------------------------------------------------

builder.Services.AddScoped<LoginService>();
builder.Services.AddScoped<sessionService>();
builder.Services.AddScoped<TurnoService>();
builder.Services.AddScoped<AgendaService>();
builder.Services.AddScoped<PlanTurnoService>();
builder.Services.AddScoped<usuarioService>();
builder.Services.AddScoped<PacienteService>();

// --------------------------------------------------
// 6. CORS
// --------------------------------------------------

builder.Services.AddCors(options =>
{
    options.AddPolicy("DevPolicy", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });

    options.AddPolicy("ProdPolicy", policy =>
    {
        policy
            .WithOrigins("https://tu-dominio.com")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });

    options.AddPolicy("ReactNativeDev", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// --------------------------------------------------
// 7. Base de datos SQL Server
// --------------------------------------------------

var connectionString =
    builder.Configuration.GetConnectionString(
        "DefaultConnection"
    );

if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new InvalidOperationException(
        "No se encontró ConnectionStrings:DefaultConnection."
    );
}

builder.Services.AddDbContext<PsychologistContext>(
    options => options.UseSqlServer(connectionString)
);

// --------------------------------------------------
// 8. Validar configuración JWT
// --------------------------------------------------

var jwtKey = builder.Configuration["Jwt:Key"];
var jwtIssuer = builder.Configuration["Jwt:Issuer"];
var jwtAudience = builder.Configuration["Jwt:Audience"];

if (string.IsNullOrWhiteSpace(jwtKey))
{
    throw new InvalidOperationException(
        "Falta Jwt:Key. Verificá la carga de .env.backend."
    );
}

if (string.IsNullOrWhiteSpace(jwtIssuer))
{
    throw new InvalidOperationException(
        "Falta Jwt:Issuer. Verificá la carga de .env.backend."
    );
}

if (string.IsNullOrWhiteSpace(jwtAudience))
{
    throw new InvalidOperationException(
        "Falta Jwt:Audience. Verificá la carga de .env.backend."
    );
}

// --------------------------------------------------
// 9. Autenticación JWT
// --------------------------------------------------

builder.Services
    .AddAuthentication(
        JwtBearerDefaults.AuthenticationScheme
    )
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

                IssuerSigningKey =
                    new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(jwtKey)
                    )
            };

        // Diagnóstico solo durante desarrollo.
        if (builder.Environment.IsDevelopment())
        {
            options.Events = new JwtBearerEvents
            {
                OnAuthenticationFailed = context =>
                {
                    Console.WriteLine(
                        $"Auth failed: {context.Exception.Message}"
                    );

                    return Task.CompletedTask;
                },

                OnMessageReceived = context =>
                {
                    Console.WriteLine(
                        "Token recibido: " +
                        (!string.IsNullOrEmpty(context.Token)
                            ? "Sí"
                            : "No")
                    );

                    return Task.CompletedTask;
                },

                OnTokenValidated = context =>
                {
                    Console.WriteLine(
                        "Token JWT validado correctamente."
                    );

                    return Task.CompletedTask;
                }
            };
        }
    });

// --------------------------------------------------
// 10. Construir aplicación
// --------------------------------------------------

var app = builder.Build();

// --------------------------------------------------
// 11. Swagger
// --------------------------------------------------

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// --------------------------------------------------
// 12. Middleware
// --------------------------------------------------

app.UseCors(
    app.Environment.IsDevelopment()
        ? "DevPolicy"
        : "ProdPolicy"
);

app.UseAuthentication();
app.UseAuthorization();

// --------------------------------------------------
// 13. Endpoints
// --------------------------------------------------

app.MapControllers();

app.Run();
