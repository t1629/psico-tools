using PsychologistsAPI.Models;
using PsychologistsAPI.Dtos;



namespace PsychologistsAPI.Mapper
{
    public class ConsultorioMapper
    {
        public static ConsultorioDto ToDto(Consultorio entity)
        {
            return new ConsultorioDto
            {
              ConsultorioId = entity.ConsultorioId,
              Nombre = entity.Nombre,
              Numero = entity.Numero,
              Calle = entity.Calle,
              TipoModalidadId = entity.TipoModalidadId,
              TipoModalidadNombre = entity.TipoModalidad?.Nombre
            };
        }


        public static Consultorio ToEntity(ConsultorioDto dto)
        {
            return new Consultorio
            {
                ConsultorioId = dto.ConsultorioId,
                Nombre = dto.Nombre,
                Numero = dto.Numero,
                Calle = dto.Calle,
                TipoModalidadId = dto.TipoModalidadId,
                

            };
        }

        }
}
