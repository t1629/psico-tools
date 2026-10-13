using PsychologistsAPI.Repositories;
using PsychologistsAPI.Dtos;
using PsychologistsAPI.Models;

namespace PsychologistsAPI.Services
{
    public class PlanTurnoService
    {
        private readonly PlanTurnoRepository _repo;

        public PlanTurnoService(PlanTurnoRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<PlanTurnoDto>> GetAll()
        {
            var planes = await _repo.GetAllAsync();
            return planes.Select(MapToDto).ToList();
        }

        public async Task<PlanTurnoDto?> GetById(int id)
        {
            var plan = await _repo.GetByIdAsync(id);
            return plan == null ? null : MapToDto(plan);
        }

        public async Task<PlanTurnoDto?> GetByIdWithPaciente(int id)
        {
            var plan = await _repo.GetByIdWithPacienteAsync(id);
            return plan == null ? null : MapToDto(plan);
        }

        public async Task<PlanTurnoDto> Create(PlanTurnoDto dto)
        {
            if (dto.FechaInicio > dto.FehcaFin)
                throw new ArgumentException("La fecha de inicio debe ser anterior o igual a la fecha de fin.");

            var plan = new PlanTurno
            {
                FechaInicio = dto.FechaInicio,
                FehcaFin = dto.FehcaFin,
                CantidadTurno = dto.CantidadTurno
            };

            await _repo.AddAsync(plan);
            return MapToDto(plan);
        }

        public async Task<PlanTurnoDto?> Update(PlanTurnoDto dto)
        {
            var plan = await _repo.GetByIdAsync(dto.PlanTurnoId);
            if (plan == null) return null;

            plan.FechaInicio = dto.FechaInicio;
            plan.FehcaFin = dto.FehcaFin;
            plan.CantidadTurno = dto.CantidadTurno;

            await _repo.UpdateAsync(plan);
            return MapToDto(plan);
        }

        public async Task<bool> Delete(int id)
        {
            var plan = await _repo.GetByIdAsync(id);
            if (plan == null) return false;

            await _repo.DeleteAsync(plan);
            return true;
        }

        private static PlanTurnoDto MapToDto(PlanTurno plan)
        {
            return new PlanTurnoDto
            {
                PlanTurnoId = plan.PlanTurnoId,
                FechaInicio = plan.FechaInicio,
                FehcaFin = plan.FehcaFin,
                CantidadTurno = plan.CantidadTurno
            };
        }
    }
}
