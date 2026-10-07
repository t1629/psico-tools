using PsychologistsAPI.Repositories;
using PsychologistsAPI.Dtos;
using PsychologistsAPI.Models;
using PsychologistsAPI.Mapper;

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
            var paciente = await _repo.GetAllAsync();
            return paciente.Select(p => PacienteMapper.ToDto(p)).ToList();
        } 


        public async Task<PacienteDto> GetById(int id)
        {
            var paciente = await _repo.GetByIdAsync(id);

            return paciente == null ? null : PacienteMapper.ToDto(paciente);
        }


        public async Task<PacienteDto> Create(PacienteDto dto)
        {
            var paciente = new Paciente
            {
                Nombre = dto.Nombre,
                Apellido = dto.Apellido,
                Telefono = dto.Telefono,
                Email = dto.Email,
                Dni = dto.Dni,
                FechaNacimineto = dto.FechaNacimineto
            };

            await _repo.AddAsync(paciente);
            return PacienteMapper.ToDto(paciente);

        }



        public async Task<PacienteDto?> Update(int id, PacienteDto dto)
        {
            var paciente = await _repo.GetByIdAsync(id);
            if (paciente == null) return null;

            paciente.Nombre = dto.Nombre;
            paciente.Apellido = dto.Apellido;
            paciente.Telefono = dto.Telefono;
            paciente.Email = dto.Email;
            paciente.Dni = dto.Dni;
            paciente.FechaNacimineto = dto.FechaNacimineto;

            await _repo.UpdateAsync(paciente);

            return PacienteMapper.ToDto(paciente);

        }


        public async Task<bool> Remove(int id)
        {
            var paciente = await _repo.GetByIdAsync(id);
            if (paciente == null) return false;

            await _repo.DeleteAsync(paciente);
            return true;
        } 

    }
}
