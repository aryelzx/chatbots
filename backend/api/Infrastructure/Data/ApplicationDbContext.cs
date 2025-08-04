using Microsoft.EntityFrameworkCore;
using ModularApi.Modules.Users.Models;

namespace ModularApi.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> usuarios { get; set; }
        public DbSet<Chats> chats { get; set; }
        public DbSet<Mensagem> mensagens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }

}