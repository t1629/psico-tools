using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PsychologistsAPI.Models;
using PsychologistsAPI.Services;

namespace PsychologistsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class turnoController : ControllerBase
    {
        private readonly TurnoService _service;

        public turnoController(TurnoService service)
        {
            _service = service;
        }

        // GET: api/turno
        // GET: api/turno?desde=2026-09-01&hasta=2026-09-30
        [HttpGet]
        public async Task<IActionResult> Get(
            [FromQuery] DateOnly? desde,
            [FromQuery] DateOnly? hasta)
        {
            try
            {
                if (desde.HasValue && hasta.HasValue && desde > hasta)
                {
                    return BadRequest(new
                    {
                        message = "La fecha desde no puede ser posterior a la fecha hasta."
                    });
                }

                var turnos = await _service.GetByDateRange(desde, hasta);

                return Ok(turnos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al obtener los turnos.",
                    error = ex.Message
                });
            }
        }

        // GET: api/turno/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var turno = await _service.GetById(id);

                if (turno == null)
                {
                    return NotFound(new
                    {
                        message = $"No se encontró el turno con ID {id}."
                    });
                }

                return Ok(turno);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al obtener el turno.",
                    error = ex.Message
                });
            }
        }

        // GET: api/turno/5/paciente
        [HttpGet("{id}/paciente")]
        public async Task<IActionResult> GetByIdWithPaciente(int id)
        {
            try
            {
                var turno = await _service.GetByIdWithPaciente(id);

                if (turno == null)
                {
                    return NotFound(new
                    {
                        message = $"No se encontró el turno con ID {id}."
                    });
                }

                return Ok(turno);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al obtener el turno con el paciente.",
                    error = ex.Message
                });
            }
        }

        // POST: api/turno
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TurnoDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var turno = await _service.Create(dto);

                return CreatedAtAction(
                    nameof(GetById),
                    new { id = turno.TurnoId },
                    turno
                );
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al crear el turno.",
                    error = ex.Message
                });
            }
        }

        // PUT: api/turno/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(
            int id,
            [FromBody] TurnoDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var turno = await _service.Update(id, dto);

                if (turno == null)
                {
                    return NotFound(new
                    {
                        message = $"No se encontró el turno con ID {id}."
                    });
                }

                return Ok(turno);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al modificar el turno.",
                    error = ex.Message
                });
            }
        }

        // PUT: api/turno/5/estado
        [HttpPut("{id}/estado")]
        public async Task<IActionResult> ChangeStatus(
            int id,
            [FromBody] string estado)
        {
            if (string.IsNullOrWhiteSpace(estado))
            {
                return BadRequest(new
                {
                    message = "El estado es obligatorio."
                });
            }

            try
            {
                var result = await _service.ChangeStatus(id, estado);

                if (!result)
                {
                    return NotFound(new
                    {
                        message = $"No se encontró el turno con ID {id}."
                    });
                }

                return Ok(new
                {
                    message = "Estado del turno actualizado correctamente."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al cambiar el estado del turno.",
                    error = ex.Message
                });
            }
        }

        // DELETE: api/turno/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var result = await _service.Delete(id);

                if (!result)
                {
                    return NotFound(new
                    {
                        message = $"No se encontró el turno con ID {id}."
                    });
                }

                return Ok(new
                {
                    message = "Turno eliminado correctamente."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al eliminar el turno.",
                    error = ex.Message
                });
            }
        }
    }
}