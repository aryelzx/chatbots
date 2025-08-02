using Microsoft.EntityFrameworkCore;
using ModularApi.Infrastructure.Data;
using ModularApi.Modules.Chats.DTOs;
using ModularApi.Modules.Users.Models;

public class MessagesService
{
    private readonly ApplicationDbContext _context;
    private readonly OpenAiService _openAiService;

    public MessagesService(ApplicationDbContext context)
    {
        _context = context;
        _openAiService = new OpenAiService();
    }

    /// <summary>
    /// Envia uma pergunta para o modelo de IA e retorna a resposta.
    /// </summary>
    /// <param name="id_chat">ID do chat.</param>
    /// <param name="pergunta">Pergunta a ser enviada.</param>
    /// <returns>Resposta da IA.</returns>
    public async Task<List<Mensagem>> RegisterMessage(int id_chat, MensagemInputDto pergunta)
    {
        var chat = _context.chats.FirstOrDefault(c => c.id == id_chat && c.deleted_at == null && c.status == "A");
        if (chat == null)
        {
            throw new Exception("Chat não encontrado ou inativo.");
        }

      var now = DateTime.UtcNow;
        var userMessage = new Mensagem
        {
            chat_id = id_chat,
            created_at = now,
            user_id = pergunta.user_id,
            mensagem = pergunta.prompt_input_text,
            prompt_input_text = pergunta.prompt_input_text,
            prompt_context = chat.context,
            tipo = "P",
            send_by = "U",
            created_by = pergunta.created_by,
            prompt_modelo = chat.modelo
        };
        _context.mensagens.Add(userMessage);
        await _context.SaveChangesAsync();

    
        var resposta = await _openAiService.QuestionAsync(pergunta);

        var botMessage = new Mensagem
        {
            chat_id = id_chat,
            created_at =  now.AddMilliseconds(5),
            user_id = pergunta.user_id,
            mensagem = resposta,
            prompt_input_text = pergunta.prompt_input_text,
            prompt_context = chat.context,
            tipo = "R",
            send_by = "B",
            created_by = pergunta.created_by,
            prompt_modelo = chat.modelo
        };
        _context.mensagens.Add(botMessage);
        await _context.SaveChangesAsync();

        return new List<Mensagem>
        { 
            userMessage,
            botMessage
         };
    }

    /// <summary>
    /// Retorna todas as mensagens baseadas no ID do chat.
    /// </summary>
    /// <param name="id_chat">ID do chat.</param>
    /// <returns>Lista de mensagens do chat.</returns>
    public async Task<List<Mensagem>> GetMessagesByChat(int id_chat)
    {
        try
        {

            var chat = _context.chats.FirstOrDefault(c => c.id == id_chat && c.deleted_at == null);
            if (chat == null)
            {
                throw new Exception("Chat não encontrado ou inativo.");
            }
            var mensagens = await _context.mensagens
                .Where(m => m.chat_id == id_chat && m.deleted_at == null)
                .OrderByDescending(m => m.created_at)
                .ToListAsync();
            return mensagens;
        }
        catch (Exception ex)
        {
            throw new Exception("Erro ao buscar mensagens do chat.", ex);
        }
    }
}
