namespace ModularApi.Modules.Auth.DTOs
{
    public class LoginDto
    {
        public string cpf { get; set; } = string.Empty;
        public string senha { get; set; } = string.Empty;
    }

    public class LoginResponseDto
    {
        public string id { get; set; } = string.Empty;
        public string nome { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public string role { get; set; } = string.Empty;
        public string cpf { get; set; } = string.Empty;
    
    }

}
