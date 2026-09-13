using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PsychologistsAPI.Models;
using PsychologistsAPI.Services;

namespace PsychologistsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class disponibilidadController : ControllerBase
    {
        private readonly DisponibilidadService _service;

        public disponibilidadController(DisponibilidadService service)
        {
            _service = service;
        }

        // GET: api/disponibilidad
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var disponibilidades = await _service.GetAll();

                return Ok(disponibilidades);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al obtener las disponibilidades.",
                    error = ex.Message
                });
            }
        }

        // GET: api/disponibilidad/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var disponibilidad = await _service.GetById(id);

                if (disponibilidad == null)
                {
                    return NotFound(new
                    {
                        message = $"No se encontró la disponibilidad con ID {id}."
                    });
                }

                return Ok(disponibilidad);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al obtener la disponibilidad.",
                    error = ex.Message
                });
            }
        }

        // POST: api/disponibilidad
        [HttpPost]
        public async Task<IActionResult> Post(
            [FromBody] DisponibilidadDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var disponibilidad = await _service.Create(dto);

                return CreatedAtAction(
                    nameof(GetById),
                    new { id = disponibilidad.DisponibilidadId },
                    disponibilidad
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
                    message = "Error al crear la disponibilidad.",
                    error = ex.Message
                });
            }
        }

        // PUT: api/disponibilidad/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(
            int id,
            [FromBody] DisponibilidadDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var disponibilidad = await _service.Update(id, dto);

                if (disponibilidad == null)
                {
                    return NotFound(new
                    {
                        message = $"No se encontró la disponibilidad con ID {id}."
                    });
                }

                return Ok(disponibilidad);
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
                    message = "Error al modificar la disponibilidad.",
                    error = ex.Message
                });
            }
        }

        // PUT: api/disponibilidad/5/activo
        [HttpPut("{id}/activo")]
        public async Task<IActionResult> ChangeStatus(int id)
        {
            try
            {
                var result = await _service.ChangeStatus(id);

                if (!result)
                {
                    return NotFound(new
                    {
                        message = $"No se encontró la disponibilidad con ID {id}."
                    });
                }

                return Ok(new
                {
                    message = "Estado de la disponibilidad actualizado correctamente."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al cambiar el estado de la disponibilidad.",
                    error = ex.Message
                });
            }
        }

        // DELETE: api/disponibilidad/5
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
                        message = $"No se encontró la disponibilidad con ID {id}."
                    });
                }

                return Ok(new
                {
                    message = "Disponibilidad eliminada correctamente."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al eliminar la disponibilidad.",
                    error = ex.Message
                });
            }
        }
    }
}