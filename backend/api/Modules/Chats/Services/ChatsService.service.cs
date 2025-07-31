using ModularApi.Infrastructure.Data;
using ModularApi.Modules.Chats.DTOs;
using ModularApi.Modules.Users.Models;

public interface IChatsService
{
    List<ChatDto> GetAllChats();
    List<ChatDto> ChatByName(string nome);
    ChatDto CreateChat(ChatDto chat);
    ChatDto UpdateChatById(int id, ChatDto chatDto);

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

    public bool GetChatById(int id)
    {
        var chat = _context.chats
            .Where(c => c.user_id == id && c.deleted_at == null)
            .Select(c => new ChatDto
            {
                id = c.id
            })
            .FirstOrDefault();
        if (chat == null)
        {
           return false;
        }

        return true;
    }

    public List<ChatDto> ChatByName(string nome)
    {
        var chats = _context.chats
        .Where(c => c.nome.ToLower().Contains(nome.ToLower()) && c.deleted_at == null)
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
        if (chats.Count == 0)
        {
            throw new Exception("Nenhum chat encontrado.");
        }
        return chats;
    }

    public ChatDto CreateChat(ChatDto chatDto)
    {
        var chat = new Chats
        {
            context = chatDto.context,
            nome = chatDto.nome.ToLower(),
            modelo = chatDto.modelo,
            descricao = chatDto.descricao,
            status = chatDto.status,
            user_id = chatDto.user_id,
            created_by = chatDto.created_by,
            created_at = DateTime.UtcNow
        };

        _context.chats.Add(chat);
        _context.SaveChanges();

        return new ChatDto
        {
            id = chat.id,
            context = chat.context,
            nome = chat.nome,
            modelo = chat.modelo,
            descricao = chat.descricao,
            status = chat.status,
            user_id = chat.user_id,
            created_by = chat.created_by,
            updated_by = null, // Initially null
            deleted_by = null, // Initially null
            created_at = chat.created_at,
            updated_at = null, // Initially null
            deleted_at = null // Initially null
        };
    }
    public ChatDto UpdateChatById(int id, ChatDto chatDto)
    {
        var chat = _context.chats.FirstOrDefault(c => c.id == id && c.deleted_at == null);
        if (chat == null)
        {
            throw new Exception("Chat não encontrado.");
        }

        chat.nome = chatDto.nome;
        chat.context = chatDto.context;
        chat.modelo = chatDto.modelo;
        chat.descricao = chatDto.descricao;
        chat.status = chatDto.status;
        chat.updated_by = chatDto.updated_by;
        chat.updated_at = DateTime.UtcNow;

        _context.SaveChanges();

        return new ChatDto
        {
            id = chat.id,
            context = chat.context,
            nome = chat.nome,
            modelo = chat.modelo,
            descricao = chat.descricao,
            status = chat.status,
            user_id = chat.user_id,
            created_by = chat.created_by,
            updated_by = chat.updated_by,
            deleted_by = chat.deleted_by,
            created_at = chat.created_at,
            updated_at = chat.updated_at,
            deleted_at = chat.deleted_at
        };
    }
}