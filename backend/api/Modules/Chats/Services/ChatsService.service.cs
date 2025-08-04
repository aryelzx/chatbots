using ModularApi.Infrastructure.Data;
using ModularApi.Modules.Chats.DTOs;
using ModularApi.Modules.Users.Models;

public interface IChatsService
{
    List<ChatDto> GetAllChats(int userId);
    List<ChatDto> ChatByName(string nome);
    ChatDto CreateChat(ChatInputDto chat);
    ChatDto UpdateChatById(int id, ChatDto chatDto);

}

public class ChatsService : IChatsService
{
    private readonly ApplicationDbContext _context;

    public ChatsService(ApplicationDbContext context)
    {
        _context = context;
    }

    public List<ChatDto> GetAllChats(int userId)
    {
        return _context.chats
            .Where(c => c.deleted_at == null && c.user_id == userId)
            .Select(c => new ChatDto
            {
                Id = c.id,
                Context = c.context,
                Nome = c.nome,
                Modelo = c.modelo,
                Descricao = c.descricao,
                Status = c.status,
                UserId = c.user_id,
                CreatedBy = c.created_by,
                UpdatedBy = c.updated_by,
                DeletedBy = c.deleted_by,
                CreatedAt = c.created_at,
                UpdatedAt = c.updated_at,
                DeletedAt = c.deleted_at
            })
            .ToList();
    }

    public bool GetChatById(int id)
    {
        var chat = _context.chats
            .Where(c => c.user_id == id && c.deleted_at == null)
            .Select(c => new ChatDto
            {
                Id = c.id
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
            Id = c.id,
            Context = c.context,
            Nome = c.nome,
            Modelo = c.modelo,
            Descricao = c.descricao,
            Status = c.status,
            UserId = c.user_id,
            CreatedBy = c.created_by,
            UpdatedBy = c.updated_by,
            DeletedBy = c.deleted_by,
            CreatedAt = c.created_at,
            UpdatedAt = c.updated_at,
            DeletedAt = c.deleted_at
        })
        .ToList();
        if (chats.Count == 0)
        {
            throw new Exception("Nenhum chat encontrado.");
        }
        return chats;
    }

    public ChatDto GetLatestChatByUserId(int userId)
    {
        var chat = _context.chats
            .Where(c => c.user_id == userId && c.deleted_at == null)
            .OrderByDescending(c => c.created_at)
            .Select(c => new ChatDto
            {
                Id = c.id,
                Context = c.context,
                Nome = c.nome,
                Modelo = c.modelo,
                Descricao = c.descricao,
                Status = c.status,
                UserId = c.user_id,
                CreatedBy = c.created_by,
                UpdatedBy = c.updated_by,
                DeletedBy = c.deleted_by,
                CreatedAt = c.created_at,
                UpdatedAt = c.updated_at,
                DeletedAt = c.deleted_at
            })
            .FirstOrDefault();

        if (chat == null)
        {
            return new ChatDto
            {
                Id = 0,
                Context = string.Empty,
                Nome = string.Empty,
                Modelo = string.Empty,
                Descricao = null,
                Status = string.Empty,
                UserId = userId,
                CreatedBy = null,
                UpdatedBy = null,
                DeletedBy = null,
                CreatedAt = DateTime.MinValue,
                UpdatedAt = null,
                DeletedAt = null
            };
        }

        return chat;
    }

    public ChatDto CreateChat(ChatInputDto chatDto)
    {
        var chat = new Chats
        {
            context = chatDto.Context,
            nome = chatDto.Nome.ToLower(),
            modelo = chatDto.Modelo,
            descricao = chatDto.Descricao,
            status = chatDto.Status,
            user_id = chatDto.User_id,
            created_by = chatDto.User_id,
            created_at = DateTime.UtcNow
        };

        _context.chats.Add(chat);
        _context.SaveChanges();

        return new ChatDto
        {
            Id = chat.id,
            Context = chat.context,
            Nome = chat.nome,
            Modelo = chat.modelo,
            Descricao = chat.descricao,
            Status = chat.status,
            UserId = chat.user_id,
            CreatedBy = chat.created_by,
            UpdatedBy = null,
            DeletedBy = null,
            CreatedAt = chat.created_at,
            UpdatedAt = null,
            DeletedAt = null
        };
    }
    public ChatDto UpdateChatById(int id, ChatDto chatDto)
    {
        var chat = _context.chats.FirstOrDefault(c => c.id == id && c.deleted_at == null);
        if (chat == null)
        {
            throw new Exception("Chat não encontrado.");
        }

        chat.nome = chatDto.Nome;
        chat.context = chatDto.Context;
        chat.modelo = chatDto.Modelo;
        chat.descricao = chatDto.Descricao;
        chat.status = chatDto.Status;
        chat.updated_by = chatDto.UpdatedBy;
        chat.updated_at = DateTime.UtcNow;

        _context.SaveChanges();

        return new ChatDto
        {
            Id = chat.id,
            Context = chat.context,
            Nome = chat.nome,
            Modelo = chat.modelo,
            Descricao = chat.descricao,
            Status = chat.status,
            UserId = chat.user_id,
            CreatedBy = chat.created_by,
            UpdatedBy = chat.updated_by,
            DeletedBy = chat.deleted_by,
            CreatedAt = chat.created_at,
            UpdatedAt = chat.updated_at,
            DeletedAt = chat.deleted_at
        };
    }
}