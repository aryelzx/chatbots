namespace ModularApi.Modules.Users.Models
{
    public class Chats
    {
       public int Id { get; set; }

        public required string Context { get; set; } 

        public required string Nome { get; set; } 

        public required string Modelo { get; set; } 

        public string? Descricao { get; set; } 
        public required string Status { get; set; } // 'A' - Active, 'I' - Inactive

        public int UserId { get; set; }
    }
    public class Mensagem
    {
        public int Id { get; set; } 
        public int ChatId { get; set; } 

        public int UserId { get; set; }

        public string MensagemTexto { get; set; }

        public string? PromptInputText { get; set; } 

        public string Tipo { get; set; }

        public string? PromptContext { get; set; }

        public string? PromptRole { get; set; }

        public string? PromptModelo { get; set; }

        public string SendBy { get; set; }
    }
}
