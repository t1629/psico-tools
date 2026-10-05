using PsychologistsAPI.Models;
using PsychologistsAPI.Dtos;

namespace PsychologistsAPI.Mapper
{
    public class PsicologoMapper
    {
        public static PsicologoDto ToDto(Psicologo psicologo)
        {
            return new PsicologoDto
            {
                PsicologoId = psicologo.PsicologoId,
                Nombre = psicologo.Nombre,
                Apellido = psicologo.Apellido,
                Telefono = psicologo.Telefono,               
                Email = psicologo.Email
            };
        }
    }
}
