using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace PsychologistsAPI.Controllers
{
    [Route("api/{controller}")]
    [ApiController]
    public class logOut : ControllerBase
    {
        [Authorize]
        [HttpPost]

        public IActionResult logout()
        {
            return Ok(new
            {
                message  = "La sesión se ha cerrado correctamente"
            });
        }

    }
}
