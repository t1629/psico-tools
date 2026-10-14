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
              Nomrbe = entity.Nomrbe,
              Nuemro = entity.Nuemro,
              Calle = entity.Calle,
              TipoModalidadId = entity.TipoModalidadId,

            };
        }


        public static Consultorio ToEntity(ConsultorioDto dto)
        {
            return new Consultorio
            {
                ConsultorioId = dto.ConsultorioId,
                Nomrbe = dto.Nomrbe,
                Nuemro = dto.Nuemro,
                Calle = dto.Calle,
                TipoModalidadId = dto.TipoModalidadId,

            };
        }

        }
}
