using Microsoft.AspNetCore.Mvc;
using PsychologistsAPI.Dtos;
using PsychologistsAPI.Services;

namespace PsychologistsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConsultorioController : ControllerBase
    {
        private readonly ConsultorioService _service;

        public ConsultorioController(ConsultorioService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<ConsultorioDto>>> GetAll()
        {
            var consultorios = await _service.GetAllAsync();
            return Ok(consultorios);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ConsultorioDto>> GetById(int id)
        {
            var consultorio = await _service.GetByIdAsync(id);
            if (consultorio == null) return NotFound();
            return Ok(consultorio);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] ConsultorioDto dto)
        {
            await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = dto.ConsultorioId }, dto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] ConsultorioDto dto)
        {
            if (id != dto.ConsultorioId) return BadRequest();
            await _service.UpdateAsync(dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
