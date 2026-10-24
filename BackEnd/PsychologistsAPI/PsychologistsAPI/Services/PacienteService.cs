
using Microsoft.EntityFrameworkCore;
using PsychologistsAPI.Dtos;
using PsychologistsAPI.Mapper;
using PsychologistsAPI.Repositories;

namespace PsychologistsAPI.Services
{
    public class PacienteService
    {
        private readonly PacienteRepository _repo;

        public PacienteService(PacienteRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<PacienteDto>> GetAll()
        {
            var pacientes = await _repo.GetAllAsync();

            return pacientes
                .Select(PacienteMapper.ToDto)
                .ToList();
        }

        public async Task<PacienteDto?> GetById(int id)
        {
            var paciente = await _repo.GetByIdAsync(id);

            return paciente == null
                ? null
                : PacienteMapper.ToDto(paciente);
        }

        public async Task<PacienteDto> Create(PacienteDto dto)
        {
            var paciente = PacienteMapper.ToEntity(dto);

            await _repo.AddAsync(paciente);

            return PacienteMapper.ToDto(paciente);
        }

        public async Task<PacienteDto?> Update(int id, PacienteDto dto)
        {
            var paciente = await _repo.GetByIdAsync(id);

            if (paciente == null)
                return null;

            PacienteMapper.UpdateEntity(paciente, dto);

            await _repo.UpdateAsync(paciente);

            return PacienteMapper.ToDto(paciente);
        }

        public async Task<bool> Delete(int id)
        {
            var paciente = await _repo.GetByIdAsync(id);

            if (paciente == null)
                return false;

            if (await _repo.HasTurnosAsync(id))
            {
                throw new InvalidOperationException(
                    "No se puede eliminar el paciente porque tiene turnos asociados.");
            }

            await _repo.DeleteAsync(paciente);

            return true;
        }
    }
}
