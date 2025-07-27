using Microsoft.EntityFrameworkCore;
using ModularApi.Modules.Users.Models;

namespace ModularApi.Infrastructure.Data
{
   public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

    public DbSet<User> Usuarios { get; set; }
    public DbSet<Chats> Chats { get; set; }
    public DbSet<Mensagem> Mensagens { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}

}