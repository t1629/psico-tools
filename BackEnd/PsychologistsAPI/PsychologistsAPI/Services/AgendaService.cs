using PsychologistsAPI.Repositories;
using PsychologistsAPI.Mapper;
using PsychologistsAPI.Dtos;
using PsychologistsAPI.Models;

namespace PsychologistsAPI.Services
{
    public class AgendaService
    {
        private readonly AgendaRepository _repo;

        public AgendaService(AgendaRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<AgendaDto>> GetAll()
        {
            var agendas = await _repo.GetAllAsync();
            return agendas.Select(a => AgendaMapper.ToDto(a)).ToList();
        }

        public async Task<List<AgendaDto>> GetByDate(DateOnly? fecha)
        {
            var agendas = await _repo.GetByDateAsync(fecha);
            return agendas.Select(a => AgendaMapper.ToDto(a)).ToList();
        }

        public async Task<AgendaDto?> GetById(int id)
        {
            var agenda = await _repo.GetByIdAsync(id);
            return agenda == null ? null : AgendaMapper.ToDto(agenda);
        }
        public async Task<AgendaDto?> GetByIdWithPaciente(int id)
        {
            var agenda = await _repo.GetByIdWithPacienteAsync(id);
            return agenda == null ? null : AgendaMapper.ToDto(agenda);
        }

        public async Task<AgendaDto> Create(AgendaDto dto)
        {
            if (dto.HoraInicio >= dto.HoraFin)
                throw new ArgumentException("La hora de inicio debe ser anterior a la hora de fin.");

            var agenda = AgendaMapper.ToEntity(dto);
            await _repo.AddAsync(agenda);

            var saved = await _repo.GetByIdAsync(agenda.AgendaId);
            return AgendaMapper.ToDto(saved!);
        }

        public async Task<AgendaDto?> Update(AgendaDto dto)
        {
            var agenda = await _repo.GetByIdAsync(dto.AgendaId);
            if (agenda == null) return null;

            if (dto.HoraInicio >= dto.HoraFin)
                throw new ArgumentException("La hora de inicio debe ser anterior a la hora de fin.");

            // Actualizar campos
            agenda.ConsultorioId = dto.ConsultorioId;
            agenda.DiaSemana = dto.DiaSemana;
            agenda.Estado = dto.Estado;
            agenda.HoraInicio = dto.HoraInicio;
            agenda.HoraFin = dto.HoraFin;
            agenda.PsicologoId = dto.PsicologoId;

            await _repo.UpdateAsync(agenda);
            return AgendaMapper.ToDto(agenda);
        }

        public async Task<bool> Delete(int id)
        {
            var agenda = await _repo.GetByIdAsync(id);
            if (agenda == null) return false;

            await _repo.DeleteAsync(agenda);
            return true;
        }
    }
}
