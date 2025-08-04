using ModularApi.Modules.Chats.DTOs;

namespace ModularApi.Modules.Users.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Role { get; set; } = string.Empty; // 'A' = Admin, 'U' = User

        public string? Email { get; set; }

        public string? Nome { get; set; }

        public string Cpf { get; set; } = string.Empty;

        public string Senha { get; set; } = string.Empty;
        public DateTime? DeletedAt { get; set; }
        public int? UpdatedBy { get; set; }

    }

    public class CreateUserDto
    {
        public string Role { get; set; } = string.Empty; // 'A' = Admin, 'U' = User

        public string? Email { get; set; } = string.Empty;

        public string? Nome { get; set; } = string.Empty;

        public string Cpf { get; set; } = string.Empty;

        public string Senha { get; set; } = string.Empty;
    }
    public class UserResponseDto
    {
        public int Id { get; set; }
        public string Role { get; set; } = string.Empty; // 'A' = Admin, 'U' = User

        public string? Email { get; set; } = string.Empty;

        public string? Nome { get; set; } = string.Empty;

        public string Cpf { get; set; } = string.Empty;

        public bool HasChat { get; set; } // Indicates if the user has an associated chat

        public ChatDto? LatestChat { get; set; } // Optional chat association
    }

    public class UpdateUserInputDto
    {
        public string? Nome { get; set; } = string.Empty;
        public string? Email { get; set; } = string.Empty;
        public string? Cpf { get; set; } = string.Empty;
        public string? Role { get; set; } = string.Empty;
        public string? Senha { get; set; } = string.Empty;
    }

}
