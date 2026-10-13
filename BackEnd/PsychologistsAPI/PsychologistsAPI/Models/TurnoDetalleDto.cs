namespace PsychologistsAPI.Models
{
    public class TurnoDetalleDto
    {
        //aca se pondran Dto anidaddos apra que en turno se pueda mostar los detalles como por ejemplo los de PsicologoDto PlanTurnoDto ya que por ahora 
        //TurnoDto solo muestra el id de psicologo y planTurno


        public int TurnoId { get; set; }
        public DateOnly Fecha { get; set; }
        public TimeOnly Hora { get; set; }
        public string Estado { get; set; }
        public bool? Asistencia { get; set; }
        public string? Url { get; set; }
        public string? Descripcion { get; set; }

        
        public PacienteDto Paciente { get; set; }
        public PsicologoDto Psicologo { get; set; }
        public PlanTurnoDto PlanTurno { get; set; }
    }
}
