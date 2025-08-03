using ModularApi.Modules.Chats.DTOs;

namespace ModularApi.Modules.Users.Models
{
    public class User
    {
        public int id { get; set; }

        public string role { get; set; } // 'A' = Admin, 'U' = User

        public string? email { get; set; }

        public string? nome { get; set; }

        public string cpf { get; set; }

        public string senha { get; set; }
        public DateTime? deleted_at { get; set; }
        public int? updated_by { get; set; }

    }

    public class CreateUserDto
    {
        public string role { get; set; } // 'A' = Admin, 'U' = User

        public string? email { get; set; }

        public string? nome { get; set; }

        public string cpf { get; set; }

        public string senha { get; set; }
    }
    public class UserResponseDto
    {
        public int id { get; set; }
        public string role { get; set; } // 'A' = Admin, 'U' = User

        public string? email { get; set; }

        public string? nome { get; set; }

        public string cpf { get; set; }

        public bool hasChat { get; set; } // Indicates if the user has an associated chat

        public ChatDto? latestChat { get; set; } // Optional chat association
    }

    public class UpdateUserInputDto
    {
        public string? nome { get; set; }
        public string? email { get; set; }
        public string? cpf { get; set; }
        public string? role { get; set; }
        public string? senha { get; set; }
    }

}
