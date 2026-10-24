using PsychologistsAPI.Dtos;
using PsychologistsAPI.Mapper;
using PsychologistsAPI.Models;
using PsychologistsAPI.Repositories;

namespace PsychologistsAPI.Services
{
    public class TurnoService
    {
        private readonly TurnoRepository _repo;

        public TurnoService(TurnoRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<TurnoDetalleDto>> GetAll()
        {
            var turnos = await _repo.GetAllAsync();
            return turnos.Select(TurnoDetallleMapper.ToDetalleDto).ToList();
        }

        public async Task<List<TurnoDetalleDto>> GetByDateRange(DateOnly? desde, DateOnly? hasta)
        {
            var turnos = await _repo.GetByDateRangeAsync(desde, hasta);
            return turnos.Select(TurnoDetallleMapper.ToDetalleDto).ToList();
          
        }

        public async Task<TurnoDetalleDto?> GetById(int id)
        {
            var turno = await _repo.GetByIdAsync(id);
            return turno == null ? null : TurnoDetallleMapper.ToDetalleDto(turno);
        }
        public async Task<TurnoDto?> GetByIdWithPaciente(int id)
        {
            var turno = await _repo.GetByIdWithPacienteAsync(id);
            return turno == null ? null : MapToDto(turno);
        }


        public async Task<AttendanceStatsDto> GetAttendance(int anio, int mes)
        {
            return await _repo.GetAttendanceAsync(anio, mes);
        }

        public async Task<bool> ChangeStatus(int id, string estado)
        {
            var turno = await _repo.GetByIdAsync(id);
            if (turno == null) return false;

            turno.Estado = estado;
            await _repo.UpdateAsync(turno);
            return true;
        }
        public async Task<TurnoDetalleDto> Create(TurnoDto dto)
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

            var turnoCreado = await _repo.GetByIdAsync(turno.TurnoId);
            return TurnoDetallleMapper.ToDetalleDto(turnoCreado!);
        }

        public async Task<TurnoDetalleDto?> Update(int id, TurnoDto dto)
        {
            var turno = await _repo.GetByIdAsync(id);
            if (turno == null) return null;

            
            if (dto.Fecha != default) turno.Fecha = dto.Fecha;
            if (dto.Hora != default) turno.Hora = dto.Hora;
            if (!string.IsNullOrEmpty(dto.Estado)) turno.Estado = dto.Estado;
            if (dto.Minutos > 0) turno.Minutos = dto.Minutos;

            
            turno.Asistencia = dto.Asistencia;

            if (dto.Url != null) turno.Url = dto.Url;
            if (dto.PsicologoId.HasValue && dto.PsicologoId > 0) turno.PsicologoId = dto.PsicologoId.Value;
            if (dto.PacienteId.HasValue && dto.PacienteId > 0) turno.PacienteId = dto.PacienteId.Value;
            if (dto.PlanTurnoId.HasValue) turno.PlanTurnoId = dto.PlanTurnoId;
            if (dto.CantidadTurnos > 0) turno.CantidadTurnos = dto.CantidadTurnos;
            turno.ModalidadVirtual = dto.ModalidadVirtual;
            if (dto.Descripcion != null) turno.Descripcion = dto.Descripcion;

            await _repo.UpdateAsync(turno);

       
            var turnoActualizado = await _repo.GetByIdAsync(id);
            return TurnoDetallleMapper.ToDetalleDto(turnoActualizado!);
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
