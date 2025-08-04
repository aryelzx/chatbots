using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using ModularApi.Infrastructure.Data;
using ModularApi.Modules.Auth.DTOs;
using ModularApi.Modules.Chats.DTOs;

public class AuthService
{
    private readonly ApplicationDbContext _context;
    private readonly ChatsService _chatsService;
    private readonly IConfiguration _configuration;

    public AuthService(ApplicationDbContext context, ChatsService chatsService, IConfiguration configuration)
    {
        _context = context;
        _chatsService = chatsService;
        _configuration = configuration;
    }

    public (string token, LoginResponseDto user) Authenticate(LoginDto dto)
    {
        var user = _context.usuarios.FirstOrDefault(u => u.Cpf == dto.Cpf);
        if (user == null || string.IsNullOrEmpty(user.Senha))
            throw new UnauthorizedAccessException("CPF ou senha inválidos.");

        if (!BCrypt.Net.BCrypt.Verify(dto.Senha, user.Senha))
            throw new UnauthorizedAccessException("CPF ou senha inválidos.");

        var secretKey = Encoding.UTF8.GetBytes(_configuration["JWT:SECRETKEY"]);
        var issuer = _configuration["JWT:ISSUER"];
        var audience = _configuration["JWT:AUDIENCE"];

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: new SigningCredentials(
                new SymmetricSecurityKey(secretKey), SecurityAlgorithms.HmacSha256)
        );

        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

        var userResponse = new LoginResponseDto
        {
            Id = user.Id.ToString(),
            Nome = user.Nome ?? string.Empty,
            Cpf = user.Cpf,
            Email = user.Email ?? string.Empty,
            Role = user.Role,
            HasChat = _chatsService.GetChatById(user.Id),
            LatestChat = _chatsService.GetLatestChatByUserId(user.Id) ?? new ChatDto()
        };

        return (tokenString, userResponse);
    }
}
