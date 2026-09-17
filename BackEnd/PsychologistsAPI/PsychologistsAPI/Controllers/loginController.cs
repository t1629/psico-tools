using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client.NativeInterop;
using PsychologistsAPI.Models;
using PsychologistsAPI.Models;
using PsychologistsAPI.Services;
using System.Threading.Tasks;


namespace PsychologistsAPI.Controllers
{ 
    [Route("api/[controller]")]
    [ApiController]
    public class   loginController : ControllerBase
    {
        private readonly LoginService _service;

        public loginController(LoginService LoginService)
        {

            _service = LoginService;
        
        }

        [AllowAnonymous]
        [HttpPost]

         public async Task<IActionResult> Post([FromBody] Login login)
        {
            try
            {
                var result = await _service.VerificationLogin(login);

                if (result != null)
                {
                    return Ok(new
                    {
                        message = "Inicio de sesión exitoso",
                        token = result,
                        user = login.Email,

                    });
                }
                else
                {
                    return Unauthorized(new
                    {
                        message = "Credenciales inválidas"
                    });
                }
            }
            catch (Exception err)
            {
                return BadRequest(new
                {
                    message = $"Lo sentimos, hubo un error al registarr sus credenciales {err}",
                });
            }
        } 


    }
}
