using PsychologistsAPI.Data;
using PsychologistsAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;


namespace PsychologistsAPI.Repositories
{
    public class PacienteRepository
    {
        private readonly PsychologistContext _context;

        public PacienteRepository(PsychologistContext context)
        {
            context = _context;
        }


        public async Task<List<Paciente>> GetAllAsync()
        {
            return await _context.Pacientes.ToListAsync();
        }


        public async Task<Paciente> GetByIdAsync(int id)
        {
            return await _context.Pacientes
                .FirstOrDefaultAsync(p => p.PacienteId == id);

        }


        public async Task AddAsync(Paciente paciente)
        {
            _context.Pacientes.Add(paciente);

             await _context.SaveChangesAsync();
        }


        public async Task UpdateAsync(Paciente paciente)
        {
            _context.Pacientes.Update(paciente);

            await _context.SaveChangesAsync();
            
        }


        public async Task DeleteAsync(Paciente paciente)
        {
            _context.Pacientes.Remove(paciente);

            await _context.SaveChangesAsync();
        }
    }
}
