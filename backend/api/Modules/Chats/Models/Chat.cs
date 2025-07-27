namespace ModularApi.Modules.Users.Models
{
    public class Chats
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public DateTime Timestamp { get; set; }
        public int UserId { get; set; }

        // Navigation property
        public User User { get; set; }
    }
    public class Mensagem
    {
        public int Id { get; set; }
        public string Conteudo { get; set; }
        public DateTime DataHora { get; set; }
        public int ChatId { get; set; }

        // Navigation property
        public Chats Chat { get; set; }
        public int UserId { get; set; }
        // Navigation property
        public User User { get; set; }
    }
}
