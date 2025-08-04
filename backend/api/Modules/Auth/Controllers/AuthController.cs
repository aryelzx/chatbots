using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ModularApi.Infrastructure.Data;
using ModularApi.Modules.Auth.DTOs;
using System.Reflection.Metadata;
using ModularApi.Modules.Chats.DTOs;

namespace ModularApi.Modules.Auth.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        public AuthController(ApplicationDbContext context, AuthService authService)
        {
            _authService = authService;
        }

        /// <summary>
        /// Autentica o usuário na aplicação com o cpf e senha dele;
        /// </summary>
        /// <returns>Autenticação</returns>
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            try
            {
                var (token, user) = _authService.Authenticate(dto);

                return Ok(new
                {
                    token = token,
                    usuario = user
                });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { Message = ex.Message });
            }
        }
    }
}