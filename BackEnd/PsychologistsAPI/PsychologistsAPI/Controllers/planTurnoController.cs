using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PsychologistsAPI.Models;
using PsychologistsAPI.Services;

namespace PsychologistsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class planTurnoController : ControllerBase
    {
        private readonly PlanTurnoService _service;

        public planTurnoController(PlanTurnoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var planes = await _service.GetAll();

                return Ok(planes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al obtener los planes de turnos.",
                    error = ex.Message
                });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var plan = await _service.GetById(id);

                if (plan == null)
                {
                    return NotFound(new
                    {
                        message = $"No se encontró el plan de turnos con ID {id}."
                    });
                }

                return Ok(plan);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al obtener el plan de turnos.",
                    error = ex.Message
                });
            }
        }

        [HttpGet("{id}/paciente")]
        public async Task<IActionResult> GetByIdWithPaciente(int id)
        {
            try
            {
                var plan = await _service.GetByIdWithPaciente(id);

                if (plan == null)
                {
                    return NotFound(new
                    {
                        message = $"No se encontró el plan de turnos con ID {id}."
                    });
                }

                return Ok(plan);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al obtener el paciente del plan de turnos.",
                    error = ex.Message
                });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PlanTurnoDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var plan = await _service.Create(dto);

                return CreatedAtAction(
                    nameof(GetById),
                    new { id = plan.PlanTurnoId },
                    plan
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
                    message = "Error al crear el plan de turnos.",
                    error = ex.Message
                });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(
            int id,
            [FromBody] PlanTurnoDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                dto.PlanTurnoId = id;

                var plan = await _service.Update(dto);

                if (plan == null)
                {
                    return NotFound(new
                    {
                        message = $"No se encontró el plan de turnos con ID {id}."
                    });
                }

                return Ok(plan);
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
                    message = "Error al modificar el plan de turnos.",
                    error = ex.Message
                });
            }
        }

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
                        message = $"No se encontró el plan de turnos con ID {id}."
                    });
                }

                return Ok(new
                {
                    message = "Plan de turnos eliminado correctamente."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al eliminar el plan de turnos.",
                    error = ex.Message
                });
            }
        }
    }
}