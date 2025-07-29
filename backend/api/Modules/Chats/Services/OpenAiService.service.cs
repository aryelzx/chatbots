using System.Net.Http.Headers;
using System.Text;
using ModularApi.Modules.Chats.DTOs;
using OpenAI.Chat;

public class OpenAiService
{
    private readonly HttpClient _httpClient;

    public OpenAiService()
    {
        _httpClient = new HttpClient();
        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", Environment.GetEnvironmentVariable("OPENAI_API_KEY"));
    }

    public async Task<string> PerguntarAsync(int id_chat, MensagemInputDto pergunta)
    {

        var apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");

        Console.WriteLine($"[id_chat]: {id_chat}, [PERGUNTA]: {pergunta.promptInputText}");

        Console.WriteLine($"[apiKey]: {apiKey}");
        ChatClient client = new(model: "gpt-3.5-turbo", apiKey: apiKey);

        ChatCompletion completion = client.CompleteChat(pergunta.promptInputText);
        return completion.Content[0].Text;
    }
}