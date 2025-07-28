using ModularApi.Infrastructure.Data;
using ModularApi.Modules.Chats.DTOs;

public interface IChatsService
{
    List<ChatDto> GetAllChats();
    ChatDto ChatByName(string nome);



}

public class ChatsService : IChatsService
{
    private readonly ApplicationDbContext _context;

    public ChatsService(ApplicationDbContext context)
    {
        _context = context;
    }

    public List<ChatDto> GetAllChats()
    {
        return _context.chats
            .Where(c => c.deleted_at == null)
            .Select(c => new ChatDto
            {
                id = c.id,
                context = c.context,
                nome = c.nome,
                modelo = c.modelo,
                descricao = c.descricao,
                status = c.status,
                user_id = c.user_id,
                created_by = c.created_by,
                updated_by = c.updated_by,
                deleted_by = c.deleted_by,
                created_at = c.created_at,
                updated_at = c.updated_at,
                deleted_at = c.deleted_at
            })
            .ToList();
    }

    public ChatDto ChatByName(string nome)
    {
        var chat = _context.chats
        .Where(c => c.nome.Contains(nome.ToLower()) && c.deleted_at == null)
            .Select(c => new ChatDto
            {
                id = c.id,
                context = c.context,
                nome = c.nome,
                modelo = c.modelo,
                descricao = c.descricao,
                status = c.status,
                user_id = c.user_id,
                created_by = c.created_by,
                updated_by = c.updated_by,
                deleted_by = c.deleted_by,
                created_at = c.created_at,
                updated_at = c.updated_at,
                deleted_at = c.deleted_at
            })
            .FirstOrDefault();
        if (chat == null)
        {
            throw new Exception("Chat não encontrado.");
        }
        return chat;
    }
}