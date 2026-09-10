using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client.NativeInterop;
using PsychologistsAPI.Models;
using PsychologistsAPI.Services;
using System.Threading.Tasks;
using System.Security.Claims;

namespace PsychologistsAPI.Controllers 
{
    [Route("api/[controller]")]
    [ApiController]
    public class sessionController : ControllerBase
    {
        private readonly sessionService _service;

        public sessionController(sessionService service)
        {
            _service = service;
        }

        [Authorize]
        [HttpGet]

        public async Task<IActionResult> GetSession()
        {
            ClaimsPrincipal user = HttpContext.User;

            var dto = _service.ValidateSession(user);

            if (dto == null)
                return Unauthorized();

            return Ok(dto);
        }
    
    }
}
