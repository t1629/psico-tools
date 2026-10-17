namespace PsychologistsAPI.Dtos
{
    public class AttendanceStatsDto
    {
        public int TotalTurnos { get; set; }
        public int Presentes { get; set; }
        public int Ausentes { get; set; }
        public double PorcentajeAsistencia { get; set; }
    }

}
