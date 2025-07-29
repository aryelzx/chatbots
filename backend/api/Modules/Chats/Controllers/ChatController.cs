using Microsoft.AspNetCore.Mvc;
using ModularApi.Infrastructure.Data;
using ModularApi.Modules.Chats.DTOs;

namespace ModularApi.Modules.Chats.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatsController : ControllerBase
    {
        private readonly IChatsService _chatsService;
        private readonly OpenAiService _openAiService;

        public ChatsController(ApplicationDbContext context)
        {
            _chatsService = new ChatsService(context);
            _openAiService = new OpenAiService();
        }

        /// <summary>
        /// Lista todos os chats.
        /// </summary>
        /// <returns>Lista todos os chats.</returns>
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


        /// <summary>
        /// Pesquisa Chats pelo nome.
        /// </summary>
        /// <returns>Pesquisa Chats pelo nome</returns>
        [HttpGet("by-name/{nome}")]
        public IActionResult GetChatByName(string nome)
        {
            try
            {
                var chat = _chatsService.ChatByName(nome);
                return Ok(new { chats = chat });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Erro inesperado.", Details = ex.Message });
            }
        }

        /// <summary>
        /// Registra um Chat.
        /// </summary>
        /// <returns>Registro de Chats</returns>
        [HttpPost("create")]
        public IActionResult CreateChat([FromBody] ChatDto chat)
        {
            try
            {
                var createdChat = _chatsService.CreateChat(chat);
                return Ok(new { chat = createdChat });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Erro inesperado.", Details = ex.Message });
            }
        }


        /// <summary>
        /// Atualiza o Chat baseado no id.
        /// </summary>
        /// <returns>Atualiza o Chat baseado no id.</returns>
        [HttpPut("update/{id}")]
        public IActionResult UpdateChatById(int id, [FromBody] ChatDto chatDto)
        {
            if (chatDto == null || id <= 0)
            {
                return BadRequest(new { Message = "Dados inválidos." });
            }

            try
            {
                var updatedChat = _chatsService.UpdateChatById(id, chatDto);
                return Ok(new { chat = updatedChat });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Erro inesperado.", Details = ex.Message });
            }
        }

        /// <summary>
        ///  Manda mensagem para o Chat.
        ///  </summary>
        ///  <returns>Manda mensagem para o Chat.</returns>
        [HttpPost("send-message/{id}")]
        public async Task<IActionResult> SendMessageToChat(int id, [FromBody] MensagemInputDto messageDto)
        {
            if (messageDto == null || id <= 0)
            {
                return BadRequest(new { Message = "Dados inválidos." });
            }

            try
            {
                var response = await _openAiService.QuestionAsync(messageDto);  //trocar para o service de mensagens
                return Ok(new { response });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Erro inesperado.", Details = ex.Message });
            }
        }
    }
}
