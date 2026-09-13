using Data.Context;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PsychologistsAPI.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ExceptionServices;
using System.Text;
using PsychologistsAPI.Services;
using Microsoft.Identity.Client.NativeInterop;
using PsychologistsAPI.Models;

namespace PsychologistsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class usuarioController : ControllerBase
    {
        private readonly usuarioService _services;
        public usuarioController(usuarioService services)
        {
            _services = services;

        }

        [HttpGet("{id}")]

        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var validation = await _services.getUser(id);
                if (validation != null)
                {
                    return Ok(validation);
                }
                else
                {
                    return NotFound();

                }
            }
            catch (Exception err)
            {
                return BadRequest(new
                {
                    message = $"Lo sentimos, hubo un error al buscar su información {err}",
                });
            }
        }

        [HttpPost]

        public async Task<IActionResult> Post([FromBody] usuarioDto dto)
        {
            if (!ModelState.IsValid)
            {

                return BadRequest(ModelState);
            }

            try
            {
                var result = await _services.postUser(dto);


                return CreatedAtAction(nameof(Get), new { id = result.Id }, result);
            }
            catch (ArgumentException ex)
            {

                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {

                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }

        }
            [HttpPut("{id}")]

            public async Task<IActionResult> Put(int id, [FromBody] usuarioDto dto)
            {
                try
                {
                    var result = await _services.putUser(dto, id);

                    if (result == null)
                        return NotFound($"No se encontró el usuario con ID {id}.");

                    return Ok(result);
                }
                catch (ArgumentException ex)
                {
                    return BadRequest(ex.Message);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"Error interno del servidor: {ex.Message}");
                }
            }


        [HttpDelete("{id}")]

        public async Task<IActionResult> Delete(int id)
        {
            try 
            {
                var result = await _services.softDeleteUser(id);
                if (!result)
                    return NotFound($"No se encontró el usuario con ID {id}.");

                return Ok($"Usuario con ID {id}, deshabilitado correctamente.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }
        
    }
}
