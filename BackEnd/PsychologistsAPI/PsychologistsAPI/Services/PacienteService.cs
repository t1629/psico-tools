
using Data.Context;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
using PsychologistsAPI.Mapper;
using PsychologistsAPI.Models;

namespace PsychologistsAPI.Services
{
    public class PacienteService
    {
        private readonly PsychologistContext _context;

        public PacienteService(PsychologistContext context)
        {
            _context = context;
        }

        public async Task<List<PacienteDto>> GetAll()
        {
            var pacientes = await _context.Pacientes
                .AsNoTracking()
                .ToListAsync();

            return pacientes
                .Select(PacienteMapper.ToDto)
                .ToList();
        }

        public async Task<PacienteDto?> GetById(int id)
        {
            var paciente = await _context.Pacientes
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.PacienteId == id);

            if (paciente == null)
                return null;

            return PacienteMapper.ToDto(paciente);
        }

        public async Task<PacienteDto> Create(PacienteDto dto)
        {
            var paciente = PacienteMapper.ToEntity(dto);

            _context.Pacientes.Add(paciente);
            await _context.SaveChangesAsync();

            return PacienteMapper.ToDto(paciente);
        }

        public async Task<PacienteDto?> Update(
            int id,
            PacienteDto dto)
        {
            var paciente = await _context.Pacientes
                .FirstOrDefaultAsync(p => p.PacienteId == id);

            if (paciente == null)
                return null;

            PacienteMapper.UpdateEntity(paciente, dto);

            await _context.SaveChangesAsync();

            return PacienteMapper.ToDto(paciente);
        }

        public async Task<bool> Delete(int id)
        {
            var paciente = await _context.Pacientes
                .Include(p => p.Turnos)
                .FirstOrDefaultAsync(p => p.PacienteId == id);

            if (paciente == null)
                return false;

            // No eliminar pacientes que tengan historial de turnos.
            if (paciente.Turnos.Any())
                throw new InvalidOperationException(
                    "No se puede eliminar el paciente porque tiene turnos asociados.");

            _context.Pacientes.Remove(paciente);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
