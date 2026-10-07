using PsychologistsAPI.Models;
using PsychologistsAPI.Dtos;

namespace PsychologistsAPI.Mapper
{
    public class PacienteMapper
    {
        
        
            public static PacienteDto ToDto(Paciente paciente)
            {
                return new PacienteDto
                {
                    PacienteId = paciente.PacienteId,
                    Nombre = paciente.Nombre,
                    Apellido = paciente.Apellido,
                    Email = paciente.Email,
                    Telefono = paciente.Telefono,
                    Dni = paciente.Dni,
                    FechaNacimineto = paciente.FechaNacimineto
                };
            }
        
    }
}
