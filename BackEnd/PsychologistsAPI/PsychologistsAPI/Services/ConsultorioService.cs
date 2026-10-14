using PsychologistsAPI.Dtos;
using PsychologistsAPI.Models;
using PsychologistsAPI.Mapper;
using PsychologistsAPI.Repositories;

namespace PsychologistsAPI.Services
{
    public class ConsultorioService
    {
        private readonly ConsultorioRepository _repo;

        public ConsultorioService(ConsultorioRepository repository)
        {
            _repo = repository;
        }

        public async Task<List<ConsultorioDto>> GetAllAsync()
        {
            var consultorios = await _repo.GetAllAsync();
            return consultorios.Select(c => ConsultorioMapper.ToDto(c)).ToList();
        }

        public async Task<ConsultorioDto?> GetByIdAsync(int id)
        {
            var consultorio = await _repo.GetByIdAsync(id);
            return consultorio != null ? ConsultorioMapper.ToDto(consultorio) : null;
        }

        public async Task CreateAsync(ConsultorioDto dto)
        {
            var entity = ConsultorioMapper.ToEntity(dto);
            await _repo.AddAsync(entity);
        }

        public async Task UpdateAsync(ConsultorioDto dto)
        {
            var entity = ConsultorioMapper.ToEntity(dto);
            await _repo.UpdateAsync(entity);
        }

        public async Task DeleteAsync(int id)
        {
            await _repo.DeleteAsync(id);
        }
    }
}
