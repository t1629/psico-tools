using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PsychologistsAPI.Models;
using PsychologistsAPI.Services;

namespace PsychologistsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class agendaController : ControllerBase
    {
        private readonly AgendaService _service;

        public agendaController(AgendaService service)
        {
            _service = service;
        }

        // GET: api/agenda
        // GET: api/agenda?fecha=2026-09-13
        [HttpGet]
        public async Task<IActionResult> Get(
            [FromQuery] DateOnly? fecha)
        {
            try
            {
                var agenda = await _service.GetByDate(fecha);

                return Ok(agenda);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al obtener la agenda.",
                    error = ex.Message
                });
            }
        }

        // GET: api/agenda/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var agenda = await _service.GetById(id);

                if (agenda == null)
                {
                    return NotFound(new
                    {
                        message = $"No se encontró la agenda con ID {id}."
                    });
                }

                return Ok(agenda);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al obtener la agenda.",
                    error = ex.Message
                });
            }
        }

        // GET: api/agenda/pacientes/5
        [HttpGet("pacientes/{id}")]
        public async Task<IActionResult> GetByIdWithPaciente(int id)
        {
            try
            {
                var agenda = await _service.GetByIdWithPaciente(id);

                if (agenda == null)
                {
                    return NotFound(new
                    {
                        message = $"No se encontró la agenda con ID {id}."
                    });
                }

                return Ok(agenda);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al obtener los pacientes de la agenda.",
                    error = ex.Message
                });
            }
        }

        // POST: api/agenda
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] AgendaDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var agenda = await _service.Create(dto);

                return CreatedAtAction(
                    nameof(GetById),
                    new { id = agenda.AgendaId },
                    agenda
                );
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al crear la agenda.",
                    error = ex.Message
                });
            }
        }

        // PUT: api/agenda
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] AgendaDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var agenda = await _service.Update(dto);

                if (agenda == null)
                {
                    return NotFound(new
                    {
                        message = $"No se encontró la agenda con ID {dto.AgendaId}."
                    });
                }

                return Ok(agenda);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al modificar la agenda.",
                    error = ex.Message
                });
            }
        }

        // DELETE: api/agenda/5
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
                        message = $"No se encontró la agenda con ID {id}."
                    });
                }

                return Ok(new
                {
                    message = "Agenda eliminada correctamente."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al eliminar la agenda.",
                    error = ex.Message
                });
            }
        }
    }
}