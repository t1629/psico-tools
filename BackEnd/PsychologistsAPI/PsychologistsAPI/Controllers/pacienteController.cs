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
    public class pacienteController : ControllerBase
    {

        private readonly PacienteService _service;

        public pacienteController(PacienteService service)
        {
            _service = service;
        }


        [HttpGet]

        public async Task<IActionResult> GetAll()
        {
            try 
            {
                var paciente = await _service.GetAll();
                return Ok(paciente);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al obtener los pacientes",
                    error = ex.Message
                });
            }
        }

        [HttpGet("${id}")]

        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var paciente = _service.GetById(id);
                if (paciente == null)
                {
                    return NotFound(new
                    {
                        message = $"No se encontró ningún paciente con el ID {id}"
                    });
                }

                return Ok(paciente);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al obtener el paciente",
                    error = ex.Message
                });
            }
        }



        [HttpPost]

        public async Task<IActionResult> Post([FromBody] PacienteDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var paciente = await _service.Create(dto);

                return CreatedAtAction(
                    nameof(GetById),
                    new { id = paciente.PacienteId },
                    paciente


                );

            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Lo sentimos, no se pudo creear el nuevo paciente",
                    error = ex.Message
                });
            }
        }


        [HttpPut ("${id}")]

        public async Task<IActionResult> Put([FromBody] PacienteDto dto, int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var paciente = await _service.Update(id, dto);

                if(paciente == null)
                {
                    return NotFound(new
                    {
                        message = $"No se encontró ningún paciente con el ID {id}"
                    });
                }
                return Ok(paciente);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Lo sentimos, no se pudo actualizar el paciente",
                    error = ex.Message
                });
            }
        }

        [HttpDelete]

        public async Task<IActionResult> Remove(int id)
        {
            try
            {
                var paciente = await _service.Remove(id);

                if (paciente == null)
                {
                    return NotFound(new
                    {
                        message = $"No se encontró ningún paciente con el ID {id}"
                    });
                }

                return Ok(new
                {
                    message = "Paciente eliminado correctamente"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al obtener el paciente",
                    error = ex.Message
                });

            }
        }
    }
}
