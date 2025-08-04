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
        var user = _context.usuarios.FirstOrDefault(u => u.cpf == dto.cpf);
        if (user == null || string.IsNullOrEmpty(user.senha))
            throw new UnauthorizedAccessException("CPF ou senha inválidos.");

        if (!BCrypt.Net.BCrypt.Verify(dto.senha, user.senha))
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
            id = user.id.ToString(),
            nome = user.nome ?? string.Empty,
            cpf = user.cpf,
            email = user.email ?? string.Empty,
            role = user.role,
            hasChat = _chatsService.GetChatById(user.id),
            latestChat = _chatsService.GetLatestChatByUserId(user.id) ?? new ChatDto()
        };

        return (tokenString, userResponse);
    }
}
