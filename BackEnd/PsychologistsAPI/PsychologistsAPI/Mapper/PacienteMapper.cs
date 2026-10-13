using Data.Entities;
using PsychologistsAPI.Models;

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
                    Telefono = paciente.Telefono
                };
            }
        
    }
}
