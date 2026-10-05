using PsychologistsAPI.Repositories;
using PsychologistsAPI.Dtos;
using PsychologistsAPI.Models;

namespace PsychologistsAPI.Services
{
    public class TurnoService
    {
        private readonly TurnoRepository _repo;

        public TurnoService(TurnoRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<TurnoDto>> GetAll()
        {
            var turnos = await _repo.GetAllAsync();
            return turnos.Select(MapToDto).ToList();
        }

        public async Task<List<TurnoDto>> GetByDateRange(DateOnly? desde, DateOnly? hasta)
        {
            var turnos = await _repo.GetByDateRangeAsync(desde, hasta);
            return turnos.Select(MapToDto).ToList();
        }

        public async Task<TurnoDto?> GetById(int id)
        {
            var turno = await _repo.GetByIdAsync(id);
            return turno == null ? null : MapToDto(turno);
        }
        public async Task<TurnoDto?> GetByIdWithPaciente(int id)
        {
            var turno = await _repo.GetByIdWithPacienteAsync(id);
            return turno == null ? null : MapToDto(turno);
        }

        public async Task<bool> ChangeStatus(int id, string estado)
        {
            var turno = await _repo.GetByIdAsync(id);
            if (turno == null) return false;

            turno.Estado = estado;
            await _repo.UpdateAsync(turno);
            return true;
        }
        public async Task<TurnoDto> Create(TurnoDto dto)
        {
            var turno = new Turno
            {
                Fecha = dto.Fecha,
                Hora = dto.Hora,
                Estado = dto.Estado,
                Minutos = dto.Minutos,
                Asistencia = dto.Asistencia,
                Url = dto.Url,
                PsicologoId = dto.PsicologoId,
                PacienteId = dto.PacienteId,
                CantidadTurnos = dto.CantidadTurnos,
                ModalidadVirtual = dto.ModalidadVirtual,
                Descripcion = dto.Descripcion,
                PlanTurnoId = dto.PlanTurnoId
            };

            await _repo.AddAsync(turno);
            return MapToDto(turno);
        }

        public async Task<TurnoDto?> Update(int id, TurnoDto dto)
        {
            var turno = await _repo.GetByIdAsync(id);
            if (turno == null) return null;

            turno.Fecha = dto.Fecha;
            turno.Hora = dto.Hora;
            turno.Estado = dto.Estado;
            turno.Minutos = dto.Minutos;
            turno.Asistencia = dto.Asistencia;
            turno.Url = dto.Url;
            turno.PsicologoId = dto.PsicologoId;
            turno.PacienteId = dto.PacienteId;
            turno.ModalidadVirtual = dto.ModalidadVirtual;
            turno.CantidadTurnos = dto.CantidadTurnos;
            turno.Descripcion = dto.Descripcion;
            turno.PlanTurnoId = dto.PlanTurnoId;

            await _repo.UpdateAsync(turno);
            return MapToDto(turno);
        }

        public async Task<bool> Delete(int id)
        {
            var turno = await _repo.GetByIdAsync(id);
            if (turno == null) return false;

            await _repo.DeleteAsync(turno);
            return true;
        }

        private static TurnoDto MapToDto(Turno turno)
        {
            return new TurnoDto
            {
                TurnoId = turno.TurnoId,
                Fecha = turno.Fecha,
                Hora = turno.Hora,
                Estado = turno.Estado,
                Minutos = turno.Minutos,
                Asistencia = turno.Asistencia,
                Url = turno.Url,
                PsicologoId = turno.PsicologoId,
                PacienteId = turno.PacienteId,
                CantidadTurnos = turno.CantidadTurnos,
                ModalidadVirtual = turno.ModalidadVirtual,
                Descripcion = turno.Descripcion
            };
        }
    }
}
