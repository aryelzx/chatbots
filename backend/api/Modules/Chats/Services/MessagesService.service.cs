using Microsoft.AspNetCore.Mvc;
using ModularApi.Infrastructure.Data;
using ModularApi.Modules.Chats.DTOs;

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
    public async void RegisterMessage(int id_chat, MensagemInputDto pergunta)
    {
        var chat = _context.chats.FirstOrDefault(c => c.id == id_chat && c.deleted_at == null);
        if (chat == null)
        {
            throw new Exception("Chat não encontrado ou inativo.");
        }

        var resposta = await _openAiService.QuestionAsync(pergunta);

        // var mensagem = new MensagemDto
        // {
        //     chat_id = id_chat,
        //     content = resposta,
        //     created_at = DateTime.UtcNow,
        //     updated_at = DateTime.UtcNow
        // };

        // _context.mensagens.Add(mensagem);
        // _context.SaveChanges();

    }
}