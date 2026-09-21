using Data.Context;
using Microsoft.EntityFrameworkCore;
using Data.Entities;
using PsychologistsAPI.Models;

namespace PsychologistsAPI.Services
{
    public class TurnoService
    {
        private readonly PsychologistContext _context;

        public TurnoService(PsychologistContext context)
        {
            _context = context;
        }

        public async Task<List<TurnoDto>> GetAll()
        {
            return await _context.Turnos
                .Select(t => MapToDto(t))
                .ToListAsync();
        }

        public async Task<List<TurnoDto>> GetByDateRange(
            DateOnly? desde,
            DateOnly? hasta)
        {
            var query = _context.Turnos.AsQueryable();

            if (desde.HasValue)
                query = query.Where(t => t.Fehca >= desde.Value);

            if (hasta.HasValue)
                query = query.Where(t => t.Fehca <= hasta.Value);

            return await query
                .Select(t => MapToDto(t))
                .ToListAsync();
        }

        public async Task<TurnoDto?> GetById(int id)
        {
            var turno = await _context.Turnos
                .FirstOrDefaultAsync(t => t.TurnoId == id);

            if (turno == null)
                return null;

            return MapToDto(turno);
        }

        public async Task<TurnoDto?> GetByIdWithPaciente(int id)
        {
            var turno = await _context.Turnos
                .Include(t => t.Paciente)
                .FirstOrDefaultAsync(t => t.TurnoId == id);

            if (turno == null)
                return null;

            return MapToDto(turno);
        }

        public async Task<TurnoDto> Create(TurnoDto dto)
        {
            var turno = new Turno
            {
                Fehca = dto.Fehca,
                Hora = dto.Hora,
                Estado = dto.Estado,
                Minutos = dto.Minutos,
                Asistencia = dto.Asistencia,
                Url = dto.Url,
                PsicologoId = dto.PsicologoId,
                PacienteId = dto.PacienteId,
                CantidadTurnos = dto.CantidadTurnos,
                ModalidadVirtual = dto.ModalidadVirtual,
                Descripcion = dto.Descripcion
            };

            _context.Turnos.Add(turno);
            await _context.SaveChangesAsync();

            return MapToDto(turno);
        }

        public async Task<TurnoDto?> Update(int id, TurnoDto dto)
        {
            var turno = await _context.Turnos
                .FirstOrDefaultAsync(t => t.TurnoId == id);

            if (turno == null)
                return null;

            turno.Fehca = dto.Fehca;
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

            await _context.SaveChangesAsync();

            return MapToDto(turno);
        }

        public async Task<bool> ChangeStatus(int id, string estado)
        {
            var turno = await _context.Turnos
                .FirstOrDefaultAsync(t => t.TurnoId == id);

            if (turno == null)
                return false;

            turno.Estado = estado;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> Delete(int id)
        {
            var turno = await _context.Turnos
                .FirstOrDefaultAsync(t => t.TurnoId == id);

            if (turno == null)
                return false;

            _context.Turnos.Remove(turno);
            await _context.SaveChangesAsync();

            return true;
        }

        private static TurnoDto MapToDto(Turno turno)
        {
            return new TurnoDto
            {
                TurnoId = turno.TurnoId,
                Fehca = turno.Fehca,
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