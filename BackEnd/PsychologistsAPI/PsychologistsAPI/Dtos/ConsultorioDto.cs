using PsychologistsAPI.Models;
namespace PsychologistsAPI.Dtos
{
    public class ConsultorioDto
    {

        public int ConsultorioId { get; set; }

        public string? Nomrbe { get; set; }

        public string? Calle { get; set; }

        public int? Nuemro { get; set; }

        public int? TipoModalidadId { get; set; }
        public string TipoModalidadNombre { get; set; }

    }
}
