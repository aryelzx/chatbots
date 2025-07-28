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

        [HttpGet("by-name/{nome}")]
        public IActionResult GetChatByName(string nome)
        {
            try
            {
                var chat = _chatsService.ChatByName(nome);
                return Ok(new { chat });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Erro inesperado.", Details = ex.Message });
            }
        }
    }
}
