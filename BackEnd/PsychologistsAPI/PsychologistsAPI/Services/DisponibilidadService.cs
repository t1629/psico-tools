using Data.Context;
using Microsoft.EntityFrameworkCore;
using PsychologistsAPI.Entities;
using PsychologistsAPI.Models;

namespace PsychologistsAPI.Services
{
    public class DisponibilidadService
    {
        private readonly PsychologistContext _context;

        public DisponibilidadService(PsychologistContext context)
        {
            _context = context;
        }

        // GET: obtener todas las disponibilidades
        public async Task<List<DisponibilidadDto>> GetAll()
        {
            return await _context.Disponibilidads
                .Select(d => new DisponibilidadDto
                {
                    DisponibilidadId = d.DisponibilidadId,
                    DiaSemana = d.DiaSemana,
                    HorarioInicio = d.HorarioInicio,
                    HorarioFin = d.HorarioFin,
                    Activo = d.Activo,
                    PsicologoId = d.PsicologoId
                })
                .ToListAsync();
        }

        // GET: obtener una disponibilidad por ID
        public async Task<DisponibilidadDto?> GetById(int id)
        {
            var disponibilidad = await _context.Disponibilidads
                .FirstOrDefaultAsync(d => d.DisponibilidadId == id);

            if (disponibilidad == null)
                return null;

            return MapToDto(disponibilidad);
        }

        // POST: crear disponibilidad
        public async Task<DisponibilidadDto> Create(DisponibilidadDto dto)
        {
            if (dto.HorarioInicio >= dto.HorarioFin)
            {
                throw new ArgumentException(
                    "El horario de inicio debe ser anterior al horario de fin."
                );
            }

            var disponibilidad = new Disponibilidad
            {
                DiaSemana = dto.DiaSemana,
                HorarioInicio = dto.HorarioInicio,
                HorarioFin = dto.HorarioFin,
                Activo = dto.Activo,
                PsicologoId = dto.PsicologoId
            };

            _context.Disponibilidads.Add(disponibilidad);

            await _context.SaveChangesAsync();

            return MapToDto(disponibilidad);
        }

        // PUT: modificar disponibilidad
        public async Task<DisponibilidadDto?> Update(
            int id,
            DisponibilidadDto dto)
        {
            var disponibilidad = await _context.Disponibilidads
                .FirstOrDefaultAsync(d => d.DisponibilidadId == id);

            if (disponibilidad == null)
                return null;

            if (dto.HorarioInicio >= dto.HorarioFin)
            {
                throw new ArgumentException(
                    "El horario de inicio debe ser anterior al horario de fin."
                );
            }

            disponibilidad.DiaSemana = dto.DiaSemana;
            disponibilidad.HorarioInicio = dto.HorarioInicio;
            disponibilidad.HorarioFin = dto.HorarioFin;
            disponibilidad.Activo = dto.Activo;
            disponibilidad.PsicologoId = dto.PsicologoId;

            await _context.SaveChangesAsync();

            return MapToDto(disponibilidad);
        }

        // PUT: activar/desactivar disponibilidad
        public async Task<bool> ChangeStatus(int id)
        {
            var disponibilidad = await _context.Disponibilidads
                .FirstOrDefaultAsync(d => d.DisponibilidadId == id);

            if (disponibilidad == null)
                return false;

            disponibilidad.Activo = !disponibilidad.Activo;

            await _context.SaveChangesAsync();

            return true;
        }

        // DELETE: eliminar disponibilidad
        public async Task<bool> Delete(int id)
        {
            var disponibilidad = await _context.Disponibilidads
                .FirstOrDefaultAsync(d => d.DisponibilidadId == id);

            if (disponibilidad == null)
                return false;

            _context.Disponibilidads.Remove(disponibilidad);

            await _context.SaveChangesAsync();

            return true;
        }

        // Conversión Entity -> DTO
        private DisponibilidadDto MapToDto(Disponibilidad disponibilidad)
        {
            return new DisponibilidadDto
            {
                DisponibilidadId = disponibilidad.DisponibilidadId,
                DiaSemana = disponibilidad.DiaSemana,
                HorarioInicio = disponibilidad.HorarioInicio,
                HorarioFin = disponibilidad.HorarioFin,
                Activo = disponibilidad.Activo,
                PsicologoId = disponibilidad.PsicologoId
            };
        }
    }
}