using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModularApi.Exceptions;
using ModularApi.Infrastructure.Data;
using ModularApi.Modules.Users.Models;

namespace ModularApi.Modules.Users.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserService _userService;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
            _userService = new UserService(context);
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
                var allUsers = _userService.GetAllUsers();
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
                var userOutput = _userService.RegisterUser(user);
                return Ok(new { user = userOutput });
            }
            catch (DuplicateUserException ex)
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
                var userOutput = _userService.GetUserById(id);
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
            try
            {
                var newUser = _userService.UpdateUser(id, updatedUser);
                return Ok(new
                {
                    Message = "Usuário atualizado com sucesso.",
                    user = newUser
                });
            }
            catch (Exception ex)
            {
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
            try
            {
                _userService.DeleteUser(id, updatedBy);
                return Ok(new { Message = "Usuário deletado com sucesso." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Erro ao deletar o usuário.", Details = ex.Message });
            }
        }

    }
}
