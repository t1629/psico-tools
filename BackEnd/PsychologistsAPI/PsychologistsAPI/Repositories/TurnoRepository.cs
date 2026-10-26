using Microsoft.EntityFrameworkCore;
using PsychologistsAPI.Data;
using PsychologistsAPI.Dtos;
using PsychologistsAPI.Models;

namespace PsychologistsAPI.Repositories
{
    public class TurnoRepository
    {
        private readonly PsyClinicDbContext _context;

        public TurnoRepository(PsyClinicDbContext context)
        {
            _context = context;
        }

        public async Task<List<Turno>> GetAllAsync()
        {
            return await _context.Turnos
                       .Include(t => t.Paciente)
                       .Include(t => t.Psicologo)
                       .Include(t => t.PlanTurno)
                        
                       .ToListAsync(); ;

        }

        public async Task<List<Turno>> GetByDateRangeAsync(DateOnly? desde, DateOnly? hasta)
        {
            var query = _context.Turnos.AsQueryable();

            if (desde.HasValue)
                query = query.Where(t => t.Fecha >= desde.Value);

            if (hasta.HasValue)
                query = query.Where(t => t.Fecha <= hasta.Value);

            // FIX: incluir las navegaciones para que el DTO expuesto por /range
            // traiga paciente/psiologo/planTurno y el filtro del frontend pueda usarse.
            return await query
                .Include(t => t.Paciente)
                .Include(t => t.Psicologo)
                .Include(t => t.PlanTurno)
                .ToListAsync();
        }

        public async Task<Turno?> GetByIdAsync(int id)
        {
            return await _context.Turnos
                .Include(t => t.Paciente)
                .Include(t => t.Psicologo)
                .Include(t => t.PlanTurno)
                .FirstOrDefaultAsync(t => t.TurnoId == id);
        }
        public async Task<Turno?> GetByIdWithPacienteAsync(int id)
        {
            return await _context.Turnos
                .Include(t => t.Paciente)
                .FirstOrDefaultAsync(t => t.TurnoId == id);
        }


        public async Task<AttendanceStatsDto> GetAttendanceAsync(int anio, int mes)
        {
          
            var inicioMes = new DateOnly(anio, mes, 1);
            var finMes = inicioMes.AddMonths(1).AddDays(-1);

            var turnos = await _context.Turnos
                .Where(t => t.Fecha >= inicioMes && t.Fecha <= finMes)
                .ToListAsync();

            int total = turnos.Count;
            int presentes = turnos.Count(t => t.Asistencia == true);
            int ausentes = turnos.Count(t => t.Asistencia == false);


            double porcentaje = total > 0 ? (presentes * 100.0 / total) : 0;

            return new AttendanceStatsDto
            {
                TotalTurnos = total,
                Presentes = presentes,
                Ausentes = ausentes,
                PorcentajeAsistencia = Math.Round(porcentaje, 2) 
            };
        }





        public async Task AddAsync(Turno turno)
        {
            _context.Turnos.Add(turno);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Turno turno)
        {
            _context.Turnos.Update(turno);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Turno turno)
        {
            _context.Turnos.Remove(turno);
            await _context.SaveChangesAsync();
        }
    }
}
