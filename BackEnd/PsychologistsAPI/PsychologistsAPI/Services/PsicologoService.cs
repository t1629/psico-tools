using PsychologistsAPI.Repositories;
using PsychologistsAPI.Dtos;
using PsychologistsAPI.Models;
using PsychologistsAPI.Mapper;


namespace PsychologistsAPI.Services
{
    public class PsicologoService
    {
        private readonly PsicologoRepository _repo;

        public PsicologoService(PsicologoRepository repo)
        {
            _repo = repo;
        }


        public async Task<List<PsicologoDto>> GetAll()
        {
            var psicolgo = await _repo.GetAllAsync();

            return psicolgo.Select(p => PsicologoMapper.ToDto(p)).ToList();
        }


        public async Task<PsicologoDto> GetById(int id)
        {
            var psicologo = await _repo.GetByIdAsync(id);

            return psicologo == null ? null : PsicologoMapper.ToDto(psicologo);
        }



        public async Task<PsicologoDto> Create(PsicologoDto dto)
        {

            var psicologo = new Psicologo
            {
                Nombre = dto.Nombre,
                Apellido = dto.Apellido,
                Email = dto.Email,
                Telefono = dto.Telefono,

            };

            await _repo.AddAsync(psicologo);
            return PsicologoMapper.ToDto(psicologo);

        }


        public async Task<PsicologoDto?> Update(int id, PsicologoDto dto)
        {
            var psicologo = await _repo.GetByIdAsync(id);

            if (psicologo == null) return null;

            psicologo.Nombre = dto.Nombre;
            psicologo.Apellido = dto.Apellido;
            psicologo.Telefono = dto.Telefono;
            psicologo.Email = dto.Email;

            await _repo.UpdateAsync(psicologo);
            return PsicologoMapper.ToDto(psicologo);

        }


        public async Task<bool> Delete(int id)
        {
            var psicologo = await _repo.GetByIdAsync(id);

            if (psicologo == null) return false;

            await _repo.DeleteAsync(psicologo);
            return true;

        }
    }
}