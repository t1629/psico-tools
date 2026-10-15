using PsychologistsAPI.Models;
namespace PsychologistsAPI.Dtos
{
    public class ConsultorioDto
    {

        public int ConsultorioId { get; set; }

        public string? Nombre { get; set; }

        public string? Calle { get; set; }

        public int? Numero { get; set; }

        public int? TipoModalidadId { get; set; }
        public string TipoModalidadNombre { get; set; }

    }
}
