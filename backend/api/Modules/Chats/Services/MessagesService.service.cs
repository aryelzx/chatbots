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
    public async Task<Mensagem> RegisterMessage(int id_chat, MensagemInputDto pergunta)
    {
        var chat = _context.chats.FirstOrDefault(c => c.id == id_chat && c.deleted_at == null && c.status == "A");
        if (chat == null)
        {
            throw new Exception("Chat não encontrado ou inativo.");
        }

        var perguntaParam = new MensagemInputDto
        {
            user_id = pergunta.user_id,
            prompt_input_text = pergunta.prompt_input_text,
            context = chat.context,
            tipo = pergunta.tipo,
            send_by = pergunta.send_by,
            modelo = chat.modelo,
            created_by = pergunta.created_by
        };

        var resposta = await _openAiService.QuestionAsync(perguntaParam);

        var mensagem = new Mensagem
        {
            chat_id = id_chat,
            created_at = DateTime.UtcNow,
            user_id = pergunta.user_id,
            mensagem = resposta,
            prompt_input_text = pergunta.prompt_input_text,
            prompt_context = chat.context,
            tipo = pergunta.tipo,
            send_by = pergunta.send_by,
            created_by = pergunta.created_by,
            prompt_modelo = chat.modelo
        };

        _context.mensagens.Add(mensagem);
        _context.SaveChanges();

        return new Mensagem
        {
            id = mensagem.id,
            chat_id = mensagem.chat_id,
            user_id = mensagem.user_id,
            mensagem = mensagem.mensagem,
            prompt_input_text = mensagem.prompt_input_text,
            prompt_context = mensagem.prompt_context,
            tipo = mensagem.tipo,
            created_at = mensagem.created_at,
            prompt_modelo = mensagem.prompt_modelo,
            send_by = mensagem.send_by,
            created_by = mensagem.created_by,
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
            var mensagens = await  _context.mensagens
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
