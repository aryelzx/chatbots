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
        [HttpGet("list-all")]
        public IActionResult GetAllUsers()
        {
            try
            {
                var allUsers = _context.usuarios.Where(u => u.deleted_at == null)
                    .Select(u => new UserResponseDto
                    {
                        id = u.id,
                        cpf = u.cpf,
                        email = u.email,
                        nome = u.nome,
                        role = u.role
                    }).ToList();

                return Ok(new { user = allUsers });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Erro inesperado.", Details = ex.Message });
            }
        }

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

        /// <summary>
        /// Retorna o usuário baseado no id.
        /// </summary>
        /// <returns>Retorna o usuário baseado no id.</returns>
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

        /// <summary>
        /// Atualiza o usuário baseado no id.
        /// </summary>
        /// <returns>Atualiza o usuário baseado no id.</returns>
        [HttpPut("{id}")]
        public IActionResult UpdateById(int id, [FromBody] UpdateUserInputDto updatedUser)
        {
            var existingUser = _context.usuarios.FirstOrDefault(u => u.id == id);
            if (existingUser == null)
            {
                return NotFound(new { Message = "Usuário não encontrado." });
            }

            if (!string.IsNullOrWhiteSpace(updatedUser.email))
            {
                var email = updatedUser.email.Trim();
                if (_context.usuarios.Any(u => u.email == updatedUser.email && u.id != id))
                    return Conflict(new { Message = "E-mail já cadastrado por outro usuário." });
                existingUser.email = updatedUser.email;
            }

            if (!string.IsNullOrWhiteSpace(updatedUser.cpf))
            {
                if (_context.usuarios.Any(u => u.cpf == updatedUser.cpf && u.id != id))
                    return Conflict(new { Message = "CPF já cadastrado por outro usuário." });
                existingUser.cpf = updatedUser.cpf;
            }

            if (!string.IsNullOrWhiteSpace(updatedUser.nome))
                existingUser.nome = updatedUser.nome;

            if (!string.IsNullOrWhiteSpace(updatedUser.role))
                existingUser.role = updatedUser.role;

            if (!string.IsNullOrWhiteSpace(updatedUser.senha))
                existingUser.senha = BCrypt.Net.BCrypt.HashPassword(updatedUser.senha);

            try
            {
                _context.SaveChanges();
                return Ok(new
                {
                    Message = "Usuário atualizado com sucesso.",
                    user = new
                    {
                        id = existingUser.id,
                        existingUser.nome,
                        existingUser.email,
                        existingUser.cpf,
                        existingUser.role
                    }
                });
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null && ex.InnerException.Message.Contains("UNIQUE"))
                {
                    return Conflict(new { Message = "CPF ou e-mail já cadastrados." });
                }

                return StatusCode(500, new { Message = "Erro ao atualizar o usuário.", Details = ex.Message });
            }
        }

        /// <summary>
        /// Inativa o usuário baseado no id.
        /// </summary>
        /// <returns>Inativa o usuário baseado no id.</returns>
        [HttpPatch("delete/{id}")]
        public IActionResult DeleteById(int id, [FromQuery] string updatedBy)
        {
            var existingUser = _context.usuarios.FirstOrDefault(u => u.id == id);
            if (existingUser == null)
                return NotFound(new { Message = "Usuário não encontrado." });

            if (existingUser.deleted_at != null)
                return BadRequest(new { Message = "Usuário já foi deletado anteriormente." });

            existingUser.deleted_at = DateTime.UtcNow;
            existingUser.updated_by = int.Parse(updatedBy);
            try
            {
                _context.SaveChanges();
                return Ok(new { Message = "Usuário deletado com sucesso." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Erro ao deletar o usuário.", Details = ex.Message });
            }
        }

    }
}
