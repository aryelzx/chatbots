using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using ModularApi.Modules.Chats.DTOs;

interface IOpenAiService
{
    Task<string> QuestionAsync(MensagemInputDto pergunta);
}

public class OpenAiService : IOpenAiService
{
    private readonly HttpClient _httpClient;

    public OpenAiService()
    {
        _httpClient = new HttpClient
        {
            BaseAddress = new Uri(Environment.GetEnvironmentVariable("OPENAI_API_URL"))
        };

        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", Environment.GetEnvironmentVariable("OPENAI_API_KEY"));

        _httpClient.DefaultRequestHeaders.Add("HTTP-Referer", Environment.GetEnvironmentVariable("OPENAI_API_REFERER"));
        _httpClient.DefaultRequestHeaders.Add("X-Title", "chatbots");
    }

    public async Task<string> QuestionAsync(MensagemInputDto pergunta)
    {
        var body = new
        {
            model = "mistralai/mistral-7b-instruct:free",
            messages = new[]
            {
                new { role = "system", content = pergunta.context },
                new { role = "user", content = pergunta.prompt_input_text }
            }
        };

        var json = JsonSerializer.Serialize(body);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await _httpClient.PostAsync("/api/v1/chat/completions", content);
        var responseString = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
            throw new Exception("Erro na OpenRouter: " + responseString);

        var result = JsonSerializer.Deserialize<JsonElement>(responseString);
        return result.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();
    }
}