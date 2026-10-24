
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PsychologistsAPI.Dtos;
using PsychologistsAPI.Services;

namespace PsychologistsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class pacienteController : ControllerBase
    {
        private readonly PacienteService _pacienteService;

        public pacienteController(PacienteService pacienteService)
        {
            _pacienteService = pacienteService;
        }

        [HttpGet]
        public async Task<ActionResult<List<PacienteDto>>> GetAll()
        {
            try
            {
                var pacientes = await _pacienteService.GetAll();
                return Ok(pacientes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<PacienteDto>> GetById(int id)
        {
            try
            {
                var paciente = await _pacienteService.GetById(id);

                if (paciente == null)
                    return NotFound(new { message = "Paciente no encontrado." });

                return Ok(paciente);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<PacienteDto>> Create(
            [FromBody] PacienteDto dto)
        {
            try
            {
                var paciente = await _pacienteService.Create(dto);

                return CreatedAtAction(
                    nameof(GetById),
                    new { id = paciente.PacienteId },
                    paciente);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<PacienteDto>> Update(
            int id,
            [FromBody] PacienteDto dto)
        {
            try
            {
                if (id != dto.PacienteId)
                {
                    return BadRequest(new
                    {
                        message = "El ID de la URL no coincide con el ID del paciente."
                    });
                }

                var paciente = await _pacienteService.Update(id, dto);

                if (paciente == null)
                    return NotFound(new { message = "Paciente no encontrado." });

                return Ok(paciente);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var eliminado = await _pacienteService.Delete(id);

                if (!eliminado)
                    return NotFound(new { message = "Paciente no encontrado." });

                return Ok(new { message = "Paciente eliminado correctamente." });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
