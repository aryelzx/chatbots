using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ModularApi.Infrastructure.Data;
using ModularApi.Modules.Auth.DTOs;
using ModularApi.Modules.Users.Models;
using BCrypt.Net;

namespace ModularApi.Modules.Auth.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Autentica o usuário na aplicação com o cpf e senha dele;
        /// </summary>
        /// <returns>Autenticação</returns>
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            var user = _context.usuarios.FirstOrDefault(u => u.cpf == dto.cpf);            

            if (user == null || string.IsNullOrEmpty(user.senha))
            {
                return Unauthorized(new { Message = "CPF ou senha inválidos." });
            }

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(dto.senha, user?.senha);
            if (!isPasswordValid)
            {
                return Unauthorized(new { Message = "CPF ou senha inválidos." });
            }

            if (user == null)
                return Unauthorized("Usuário não encontrado");

            var secretKey = Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT__SECRETKEY")!);
            var issuer = Environment.GetEnvironmentVariable("JWT_ISSUER");
            var audience = Environment.GetEnvironmentVariable("JWT_AUDIENCE");

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.id.ToString()),
                new Claim(ClaimTypes.Role, user.role.ToString())
            };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(secretKey), SecurityAlgorithms.HmacSha256)
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            var userResponse = new LoginResponseDto
            {
                id = user.id.ToString(),
                nome = user.nome ?? string.Empty,
                cpf = user.cpf,
                email = user.email ?? string.Empty,
                role = user.role
            };

            return Ok(new
            {
                token = tokenString,
                usuario = userResponse
            });
        }
    }
}