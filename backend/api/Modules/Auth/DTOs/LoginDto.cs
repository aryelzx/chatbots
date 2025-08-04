using ModularApi.Modules.Chats.DTOs;

namespace ModularApi.Modules.Auth.DTOs
{
    public class LoginDto
    {
        public string Cpf { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
    }

    public class LoginResponseDto
    {
        public string Id { get; set; } = string.Empty;
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Cpf { get; set; } = string.Empty;
        public bool HasChat { get; set; } = false;

        public ChatDto LatestChat { get; set; } = new ChatDto();

    }

}
