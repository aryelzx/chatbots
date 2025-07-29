using Microsoft.AspNetCore.Mvc;
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
        var chat = _context.chats.FirstOrDefault(c => c.id == id_chat && c.deleted_at == null);
        if (chat == null)
        {
            throw new Exception("Chat não encontrado ou inativo.");
        }

        var resposta = await _openAiService.QuestionAsync(pergunta);

        var mensagem = new Mensagem
        {
            chat_id = id_chat,
            created_at = DateTime.UtcNow,
            user_id = pergunta.user_id,
            mensagem = resposta,
            prompt_input_text = pergunta.prompt_input_text,
            prompt_context = pergunta.context,
            tipo = pergunta.tipo,
            send_by = pergunta.send_by,
            created_by = pergunta.created_by
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
            created_at = mensagem.created_at
        };

    }
}