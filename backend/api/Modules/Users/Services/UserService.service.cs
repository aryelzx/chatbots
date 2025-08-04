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
            .Where(u => u.DeletedAt == null)
            .Select(u => new UserResponseDto
            {
                Id = u.Id,
                Cpf = u.Cpf,
                Email = u.Email,
                Nome = u.Nome,
                Role = u.Role
            })
            .ToList();
    }

    public UserResponseDto RegisterUser(CreateUserDto user)
    {
        if (_context.usuarios.Any(u => u.Email == user.Email || u.Cpf == user.Cpf))
            throw new DuplicateUserException("Email ou CPF já cadastrado.");

        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Senha);

        var newUser = new User
        {
            Cpf = user.Cpf,
            Email = user.Email,
            Nome = user.Nome,
            Role = user.Role,
            Senha = hashedPassword
        };

        _context.usuarios.Add(newUser);
        _context.SaveChanges();

        return new UserResponseDto
        {
            Id = newUser.Id,
            Cpf = newUser.Cpf,
            Email = newUser.Email,
            Nome = newUser.Nome,
            Role = newUser.Role
        };
    }

    public UserResponseDto GetUserById(int id)
    {
        var user = _context.usuarios.FirstOrDefault(u => u.Id == id && u.DeletedAt == null);
        if (user == null)
            throw new KeyNotFoundException("Usuário não encontrado.");

        return new UserResponseDto
        {
            Id = user.Id,
            Cpf = user.Cpf,
            Email = user.Email,
            Nome = user.Nome,
            Role = user.Role
        };
    }

    public UserResponseDto UpdateUser(int id, UpdateUserInputDto user)
    {
        var existingUser = _context.usuarios.FirstOrDefault(u => u.Id == id && u.DeletedAt == null);
        if (existingUser == null)
            throw new KeyNotFoundException("Usuário não encontrado.");
        if (!string.IsNullOrWhiteSpace(user.Email))
        {
            var email = user.Email.Trim();
            if (_context.usuarios.Any(u => u.Email == user.Email && u.Id != id))
                throw new DuplicateUserException("E-mail já cadastrado por outro usuário.");
            existingUser.Email = user.Email;
        }

        if (!string.IsNullOrWhiteSpace(user.Cpf))
        {
            if (_context.usuarios.Any(u => u.Cpf == user.Cpf && u.Id != id))
                throw new DuplicateUserException("CPF já cadastrado por outro usuário.");
            existingUser.Cpf = user.Cpf;
        }

        if (!string.IsNullOrWhiteSpace(user.Nome))
            existingUser.Nome = user.Nome;

        if (!string.IsNullOrWhiteSpace(user.Role))
            existingUser.Role = user.Role;

        if (!string.IsNullOrWhiteSpace(user.Senha))
            existingUser.Senha = BCrypt.Net.BCrypt.HashPassword(user.Senha);

        existingUser.Nome = user.Nome;
        existingUser.Email = user.Email;
        existingUser.Cpf = user.Cpf;
        existingUser.Role = user.Role;

        _context.SaveChanges();

        return new UserResponseDto
        {
            Id = existingUser.Id,
            Cpf = existingUser.Cpf,
            Email = existingUser.Email,
            Nome = existingUser.Nome,
            Role = existingUser.Role
        };
    }

    public void DeleteUser(int id, [FromQuery] string updatedBy)
    {
        var existingUser = _context.usuarios.FirstOrDefault(u => u.Id == id);
        if (existingUser == null)
            throw new KeyNotFoundException("Usuário não encontrado.");

        if (existingUser.DeletedAt != null)
            throw new InvalidOperationException("Usuário já foi deletado anteriormente.");

        existingUser.DeletedAt = DateTime.UtcNow;
        existingUser.UpdatedBy = int.Parse(updatedBy);

        _context.SaveChanges();
    }
}