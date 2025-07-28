using Microsoft.AspNetCore.Mvc;
using ModularApi.Infrastructure.Data;

namespace ModularApi.Modules.Chats.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatsController : ControllerBase
    {
        private readonly IChatsService _chatsService;

        public ChatsController(ApplicationDbContext context)
        {
            _chatsService = new ChatsService(context);
        }

        [HttpGet("list-all")]
        public IActionResult GetAllChats()
        {
            try
            {
                var allChats = _chatsService.GetAllChats();
                return Ok(new { chats = allChats });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Erro inesperado.", Details = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetChatById(int id)
        {
            try
            {
                var chat = _chatsService.ChatById(id);
                return Ok(chat);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Erro inesperado.", Details = ex.Message });
            }
        }
    }
}
