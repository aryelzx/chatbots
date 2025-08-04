namespace ModularApi.Modules.Chats.DTOs
{
    public class ChatInputDto
    {
        public string Context { get; set; } = string.Empty;
        public string Nome { get; set; } = string.Empty;
        public string Modelo { get; set; } = string.Empty;
        public string? Descricao { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int User_id { get; set; }
    }
    public class ChatDto
    {
        public int Id { get; set; }
        public string Context { get; set; } = string.Empty;
        public string Nome { get; set; } = string.Empty;
        public string Modelo { get; set; } = string.Empty;
        public string? Descricao { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int UserId { get; set; }
        public int? CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }
        public int? DeletedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
    }

    public class MensagemInputDto
    {
        public int user_id { get; set; }
        public string prompt_input_text { get; set; }
        public string? context { get; set; }
        public string tipo { get; set; }
        public string send_by { get; set; }
        public string modelo { get; set; }
        public int? created_by { get; set; }

    }

    public class MensagemDto
    {
        public int id { get; set; }
        public int chat_id { get; set; }
        public int user_id { get; set; }
        public string mensagem { get; set; } = string.Empty;
        public string prompt_input_text { get; set; } = string.Empty;
        public string tipo { get; set; } = string.Empty;
        public string? prompt_context { get; set; } = string.Empty;
        public string? prompt_role { get; set; } = string.Empty;
        public string? prompt_modelo { get; set; } = string.Empty;
        public int? send_by { get; set; }
        public int? created_by { get; set; }
        public int? updated_by { get; set; }
        public int? deleted_by { get; set; }
        public DateTime? created_at { get; set; }
        public DateTime? updated_at { get; set; }
        public DateTime? deleted_at { get; set; }
    }
}