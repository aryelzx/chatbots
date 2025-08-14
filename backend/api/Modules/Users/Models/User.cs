using System.ComponentModel.DataAnnotations.Schema;
using ModularApi.Modules.Chats.DTOs;

namespace ModularApi.Modules.Users.Models
{
    public class User
    {
         [Column("id")]
        public int Id { get; set; }

        [Column("role")]
        public string Role { get; set; } = string.Empty; // 'A' = Admin, 'U' = User

        [Column("email")]
        public string? Email { get; set; }

        [Column("nome")]
        public string? Nome { get; set; }

        [Column("cpf")]
        public string Cpf { get; set; } = string.Empty;

        [Column("senha")]
        public string Senha { get; set; } = string.Empty;

        [Column("deleted_at")]
        public DateTime? DeletedAt { get; set; }

        [Column("updated_by")]
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
