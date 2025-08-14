using System.Text.Json.Serialization;

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
        [JsonPropertyName("prompt_input_text")]
        public string PromptInputText { get; set; } = string.Empty;

        [JsonPropertyName("tipo")]
        public string Tipo { get; set; } = string.Empty;

        [JsonPropertyName("send_by")]
        public string SendBy { get; set; } = string.Empty;

        [JsonPropertyName("user_id")]
        public int UserId { get; set; }

        [JsonPropertyName("context")]
        public string? Context { get; set; } = string.Empty;

        [JsonPropertyName("created_by")]
        public int? CreatedBy { get; set; }

        [JsonPropertyName("modelo")]
        public string Modelo { get; set; } = string.Empty;
    }
}