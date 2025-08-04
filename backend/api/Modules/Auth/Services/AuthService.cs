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
        var user = _context.usuarios.FirstOrDefault(u => u.cpf == dto.Cpf);
        if (user == null || string.IsNullOrEmpty(user.senha))
            throw new UnauthorizedAccessException("CPF ou senha inválidos.");

        if (!BCrypt.Net.BCrypt.Verify(dto.Senha, user.senha))
            throw new UnauthorizedAccessException("CPF ou senha inválidos.");

        var secretKey = Encoding.UTF8.GetBytes(_configuration["JWT:SECRETKEY"]);
        var issuer = _configuration["JWT:ISSUER"];
        var audience = _configuration["JWT:AUDIENCE"];

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.id.ToString()),
            new Claim(ClaimTypes.Role, user.role.ToString())
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
            Id = user.id.ToString(),
            Nome = user.nome ?? string.Empty,
            Cpf = user.cpf,
            Email = user.email ?? string.Empty,
            Role = user.role,
            HasChat = _chatsService.GetChatById(user.id),
            LatestChat = _chatsService.GetLatestChatByUserId(user.id) ?? new ChatDto()
        };

        return (tokenString, userResponse);
    }
}
