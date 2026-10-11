
using Data.Entities;
using PsychologistsAPI.Models;

namespace PsychologistsAPI.Mapper
{
    public class PacienteMapper
    {
        public static PacienteDto ToDto(Paciente paciente)
        {
            return new PacienteDto
            {
                PacienteId = paciente.PacienteId,
                Nombre = paciente.Nombre,
                Apellido = paciente.Apellido,
                Telefono = paciente.Telefono,
                Dni = paciente.Dni,
                Email = paciente.Email,
                FechaNacimiento = paciente.FechaNacimineto,
                NumeroPaciente = paciente.NumeroPaciente,
                PlanTurnoId = paciente.PlanTurnoId
            };
        }

        public static Paciente ToEntity(PacienteDto dto)
        {
            return new Paciente
            {
                Nombre = dto.Nombre,
                Apellido = dto.Apellido,
                Telefono = dto.Telefono,
                Dni = dto.Dni,
                Email = dto.Email,
                FechaNacimineto = dto.FechaNacimiento,
                NumeroPaciente = dto.NumeroPaciente,
                PlanTurnoId = dto.PlanTurnoId
            };
        }

        public static void UpdateEntity(
            Paciente paciente,
            PacienteDto dto)
        {
            paciente.Nombre = dto.Nombre;
            paciente.Apellido = dto.Apellido;
            paciente.Telefono = dto.Telefono;
            paciente.Dni = dto.Dni;
            paciente.Email = dto.Email;
            paciente.FechaNacimineto = dto.FechaNacimiento;
            paciente.NumeroPaciente = dto.NumeroPaciente;
            paciente.PlanTurnoId = dto.PlanTurnoId;
        }
    }
}
