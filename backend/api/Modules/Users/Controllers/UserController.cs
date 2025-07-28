using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModularApi.Infrastructure.Data;
using ModularApi.Modules.Users.Models;

namespace ModularApi.Modules.Users.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Retorna todos os usuário.
        /// </summary>
        /// <returns>Lista de Usuários</returns>
        [HttpGet]
        public IActionResult Get() => Ok(new { Message = "Hello, World!" });

        /// <summary>
        /// Registra um usuário.
        /// </summary>
        /// <returns>Registro de usuários</returns>
        [HttpPost("register")]
        public IActionResult Register([FromBody] CreateUserDto user)
        {
            try
            {
                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.senha);

                var newUser = new User
                {
                    cpf = user.cpf,
                    email = user.email,
                    nome = user.nome,
                    role = user.role,
                    senha = hashedPassword
                };

                _context.usuarios.Add(newUser);
                _context.SaveChanges();

                var userOutput = new UserResponseDto
                {
                    id = newUser.id,
                    cpf = user.cpf,
                    email = user.email,
                    nome = user.nome,
                    role = user.role
                };


                return Ok(new { user = userOutput });
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException != null && ex.InnerException.Message.Contains("UNIQUE"))
                {
                    return Conflict(new { Message = "CPF ou e-mail já cadastrados." });
                }
                return StatusCode(403, new { Message = "CPF ou e-mail já cadastrados." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Erro inesperado.", Details = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var user = _context.usuarios.Find(id);
                if (user == null)
                {
                    return NotFound(new { Message = "Usuário não encontrado." });
                }

                var userOutput = new UserResponseDto
                {
                    id = user.id,
                    cpf = user.cpf,
                    email = user.email,
                    nome = user.nome,
                    role = user.role
                };

                return Ok(new { user = userOutput });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Erro inesperado.", Details = ex.Message });
            }
        }

    }
}
