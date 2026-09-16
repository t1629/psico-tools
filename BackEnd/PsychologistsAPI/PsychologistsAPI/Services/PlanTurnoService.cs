using Data.Context;
using Microsoft.EntityFrameworkCore;
using Data.Entities;
using PsychologistsAPI.Models;

namespace PsychologistsAPI.Services
{
    public class PlanTurnoService
    {
        private readonly PsychologistContext _context;

        public PlanTurnoService(PsychologistContext context)
        {
            _context = context;
        }

        public async Task<List<PlanTurnoDto>> GetAll()
        {
            return await _context.PlanTurnos
                .Select(p => MapToDto(p))
                .ToListAsync();
        }

        public async Task<PlanTurnoDto?> GetById(int id)
        {
            var plan = await _context.PlanTurnos
                .FirstOrDefaultAsync(p => p.PlanTurnoId == id);

            if (plan == null)
                return null;

            return MapToDto(plan);
        }

        public async Task<PlanTurnoDto?> GetByIdWithPaciente(int id)
        {
            var plan = await _context.PlanTurnos
                .FirstOrDefaultAsync(p => p.PlanTurnoId == id);

            if (plan == null)
                return null;

            return MapToDto(plan);
        }

        public async Task<PlanTurnoDto> Create(PlanTurnoDto dto)
        {
            if (dto.FechaInicio > dto.FehcaFin)
            {
                throw new ArgumentException(
                    "La fecha de inicio debe ser anterior o igual a la fecha de fin."
                );
            }

            var plan = new PlanTurno
            {
                FechaInicio = dto.FechaInicio,
                FehcaFin = dto.FehcaFin,
                CantidadTurno = dto.CantidadTurno,
                PsicologoId = dto.PsicologoId,
               
            };

            _context.PlanTurnos.Add(plan);

            await _context.SaveChangesAsync();

            return MapToDto(plan);
        }

        public async Task<PlanTurnoDto?> Update(PlanTurnoDto dto)
        {
            var plan = await _context.PlanTurnos
                .FirstOrDefaultAsync(p => p.PlanTurnoId == dto.PlanTurnoId);

            if (plan == null)
                return null;

            if (dto.FechaInicio > dto.FehcaFin)
            {
                throw new ArgumentException(
                    "La fecha de inicio debe ser anterior o igual a la fecha de fin."
                );
            }

            plan.FechaInicio = dto.FechaInicio;
            plan.FehcaFin = dto.FehcaFin;
            plan.CantidadTurno = dto.CantidadTurno;
            plan.PsicologoId = dto.PsicologoId;
           

            await _context.SaveChangesAsync();

            return MapToDto(plan);
        }

        public async Task<bool> Delete(int id)
        {
            var plan = await _context.PlanTurnos
                .FirstOrDefaultAsync(p => p.PlanTurnoId == id);

            if (plan == null)
                return false;

            _context.PlanTurnos.Remove(plan);

            await _context.SaveChangesAsync();

            return true;
        }

        private static PlanTurnoDto MapToDto(PlanTurno plan)
        {
            return new PlanTurnoDto
            {
                PlanTurnoId = plan.PlanTurnoId,
                FechaInicio = plan.FechaInicio,
                FehcaFin = plan.FehcaFin,
                CantidadTurno = plan.CantidadTurno,
                PsicologoId = plan.PsicologoId,
            };
        }
    }
}