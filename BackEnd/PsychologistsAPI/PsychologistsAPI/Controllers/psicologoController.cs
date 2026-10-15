using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PsychologistsAPI.Dtos;
using PsychologistsAPI.Models;
using PsychologistsAPI.Services;



namespace PsychologistsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class psicologoController : ControllerBase
    {
        private readonly PsicologoService _service;

        public psicologoController(PsicologoService service)
        {
            _service = service;
        }

        [HttpGet]

        public async Task<IActionResult> GetAll()
        {
            try
            {
                var psicologo = await _service.GetAll();
                return Ok(psicologo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al obtener los psicologos",
                    error = ex.Message
                });
            }
        }

        [HttpGet("{id}")]

        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var psicologo = _service.GetById(id);
                if (psicologo == null)
                {
                    return NotFound(new
                    {
                        message = $"No se encontró ningún psicolo con el ID {id}"
                    });
                }

                return Ok(psicologo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al obtener el psicologo",
                    error = ex.Message
                });
            }
        }

        [HttpPost]

        public async Task<IActionResult> Post([FromBody] PsicologoDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var psicologo = await _service.Create(dto);

                return CreatedAtAction(
                    nameof(GetById),
                    new { id = psicologo.PsicologoId },
                    psicologo


                );

            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Lo sentimos, no se pudo creear el nuevo psicolgo",
                    error = ex.Message
                });
            }
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> Put(int id, [FromBody] PsicologoDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var psicologo = await _service.Update(id, dto);

                if (psicologo == null)
                {
                    return NotFound(new
                    {
                        message = $"No se encontró ningún psicologo con el ID {id}"
                    });
                }
                return Ok(psicologo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Lo sentimos, no se pudo actualizar el psicologo",
                    error = ex.Message
                });
            }
        }


        [HttpDelete("{id}")]

        public async Task<IActionResult> Remove(int id)
        {
            try
            {
                var psicologo = await _service.Delete(id);

                if (psicologo == null)
                {
                    return NotFound(new
                    {
                        message = $"No se encontró ningún psicologo con el ID {id}"
                    });
                }

                return Ok(new
                {
                    message = "Psicologo eliminado correctamente"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al obtener el psicologo",
                    error = ex.Message
                });

            }
        }
    }
}