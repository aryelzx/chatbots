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

        _httpClient.DefaultRequestHeaders.Add("OpenAI-Api-Referer", Environment.GetEnvironmentVariable("OPENAI_API_REFERER"));
        _httpClient.DefaultRequestHeaders.Add("X-Title", "chatbots");
    }

    public async Task<string> QuestionAsync(MensagemInputDto pergunta)
    {
        var body = new
        {
            model = pergunta.Modelo,
            messages = new[]
            {
                new { role = "system", content = pergunta.Context },
                new { role = "user", content = pergunta.PromptInputText }
            }
        };

        var json = JsonSerializer.Serialize(body);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await _httpClient.PostAsync("/chat/completions", content);
        var responseString = await response.Content.ReadAsStringAsync();

        Console.WriteLine("STATUS: " + response.StatusCode);
        Console.WriteLine("BODY: " + responseString);

        if (!response.IsSuccessStatusCode)
            throw new Exception("Erro na OpenRouter: " + responseString);

        var result = JsonSerializer.Deserialize<JsonElement>(responseString);
        return result.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();
    }
}