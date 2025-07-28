using ModularApi.Infrastructure.Data;
using ModularApi.Modules.Users.Models;
using ModularApi.Exceptions;
using Microsoft.AspNetCore.Mvc;

public interface IUserService
{
    List<UserResponseDto> GetAllUsers();
    UserResponseDto RegisterUser(CreateUserDto user);
    UserResponseDto GetUserById(int id);
    UserResponseDto UpdateUser(int id, UpdateUserInputDto user);
    void DeleteUser(int id, [FromQuery] string updatedBy);

}


public class UserService : IUserService
{
    private readonly ApplicationDbContext _context;

    public UserService(ApplicationDbContext context)
    {
        _context = context;
    }

    public List<UserResponseDto> GetAllUsers()
    {
        return _context.usuarios
            .Where(u => u.deleted_at == null)
            .Select(u => new UserResponseDto
            {
                id = u.id,
                cpf = u.cpf,
                email = u.email,
                nome = u.nome,
                role = u.role
            })
            .ToList();
    }

    public UserResponseDto RegisterUser(CreateUserDto user)
    {
        if (_context.usuarios.Any(u => u.email == user.email || u.cpf == user.cpf))
            throw new DuplicateUserException("Email ou CPF já cadastrado.");

        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.senha);

        var newUser = new User
        {
            cpf = user.cpf,
            email = user.email,
            nome = user.nome,
            role = user.role,
            senha = hashedPassword
        };

        _context.usuarios.Add(newUser);
        _context.SaveChanges();

        return new UserResponseDto
        {
            id = newUser.id,
            cpf = newUser.cpf,
            email = newUser.email,
            nome = newUser.nome,
            role = newUser.role
        };
    }

    public UserResponseDto GetUserById(int id)
    {
        var user = _context.usuarios.FirstOrDefault(u => u.id == id && u.deleted_at == null);
        if (user == null)
            throw new KeyNotFoundException("Usuário não encontrado.");

        return new UserResponseDto
        {
            id = user.id,
            cpf = user.cpf,
            email = user.email,
            nome = user.nome,
            role = user.role
        };
    }

    public UserResponseDto UpdateUser(int id, UpdateUserInputDto user)
    {
        var existingUser = _context.usuarios.FirstOrDefault(u => u.id == id && u.deleted_at == null);
        if (existingUser == null)
            throw new KeyNotFoundException("Usuário não encontrado.");
        if (!string.IsNullOrWhiteSpace(user.email))
        {
            var email = user.email.Trim();
            if (_context.usuarios.Any(u => u.email == user.email && u.id != id))
                throw new DuplicateUserException("E-mail já cadastrado por outro usuário.");
            existingUser.email = user.email;
        }

        if (!string.IsNullOrWhiteSpace(user.cpf))
        {
            if (_context.usuarios.Any(u => u.cpf == user.cpf && u.id != id))
                throw new DuplicateUserException("CPF já cadastrado por outro usuário.");
            existingUser.cpf = user.cpf;
        }

        if (!string.IsNullOrWhiteSpace(user.nome))
            existingUser.nome = user.nome;

        if (!string.IsNullOrWhiteSpace(user.role))
            existingUser.role = user.role;

        if (!string.IsNullOrWhiteSpace(user.senha))
            existingUser.senha = BCrypt.Net.BCrypt.HashPassword(user.senha);

        existingUser.nome = user.nome;
        existingUser.email = user.email;
        existingUser.cpf = user.cpf;
        existingUser.role = user.role;

        _context.SaveChanges();

        return new UserResponseDto
        {
            id = existingUser.id,
            cpf = existingUser.cpf,
            email = existingUser.email,
            nome = existingUser.nome,
            role = existingUser.role
        };
    }

    public void DeleteUser(int id, [FromQuery] string updatedBy)
    {
        var existingUser = _context.usuarios.FirstOrDefault(u => u.id == id);
        if (existingUser == null)
            throw new KeyNotFoundException("Usuário não encontrado.");

        if (existingUser.deleted_at != null)
            throw new InvalidOperationException("Usuário já foi deletado anteriormente.");

        existingUser.deleted_at = DateTime.UtcNow;
        existingUser.updated_by = int.Parse(updatedBy);

        _context.SaveChanges();
    }
}