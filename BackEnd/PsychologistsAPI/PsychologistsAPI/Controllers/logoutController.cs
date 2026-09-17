using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;




//Es solo de aviso, no es necesario hacer nada en el backend para cerrar sesión, ya que el token se almacena en el frontend y se elimina al cerrar sesión. La logica y responsabilidad estara en el frontend


namespace PsychologistsAPI.Controllers
{
    [Route("api/{controller}")]
    [ApiController]
    public class logoutController : ControllerBase
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
