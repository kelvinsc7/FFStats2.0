using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Collections.Generic;


public class FreeFireApiService
{
    private static readonly HttpClient _httpClient = new HttpClient();
    private const string ApiKey = "Kelvinsc7"; // Chave da API
    private const string BaseUrl = "https://www.ffinfo.freefireinfo.site/info/"; // URL base da API

    public async Task<PlayerData> GetPlayerDataAsync(string region = "BR", string playerId = "")
    {
        if (string.IsNullOrEmpty(playerId))
        {
            throw new ArgumentException("Player ID must be provided.", nameof(playerId));
        }

        // Monta a URL de requisição
        string requestUrl = $"{BaseUrl}{region}/{playerId}?key={ApiKey}";

        try
        {
            // Faz a requisição GET para a API
            HttpResponseMessage response = await _httpClient.GetAsync(requestUrl);

            // Verifica se a resposta foi bem-sucedida
            response.EnsureSuccessStatusCode();

            // Lê o conteúdo da resposta como string
            string responseContent = await response.Content.ReadAsStringAsync();

            // Desserializa o JSON para o objeto PlayerData
            var playerData = JsonSerializer.Deserialize<PlayerData>(responseContent, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true // Ignora a diferença entre maiúsculas e minúsculas
            });

            return playerData;
        }
        catch (HttpRequestException ex)
        {
            // Tratamento de erros de requisição HTTP
            Console.WriteLine($"Request error: {ex.Message}");
            throw;
        }
        catch (Exception ex)
        {
            // Tratamento de erros gerais
            Console.WriteLine($"An error occurred: {ex.Message}");
            throw;
        }
    }
}
public class PlayerData
{
    public string AccountAvatarImage { get; set; }
    public string AccountBannerImage { get; set; }
    public string AccountBooyahPass { get; set; }
    public int AccountBooyahPassBadges { get; set; }
    public string AccountCelebrityStatus { get; set; }
    public long AccountCharacterID { get; set; }
    public DateTime AccountCreateTime { get; set; }
    public string AccountEvoAccessBadge { get; set; }
    public int AccountHonorScore { get; set; }
    public string AccountLanguage { get; set; }
    public DateTime AccountLastLogin { get; set; }
    public int AccountLevel { get; set; }
    public int AccountLikes { get; set; }
    public string AccountName { get; set; }
    public string AccountPinImage { get; set; }
    public string AccountRegion { get; set; }
    public string AccountSignature { get; set; }
    public string AccountUID { get; set; }
    public int AccountXP { get; set; }
    public int BRRankPoints { get; set; }
    public int CSRankPoints { get; set; }
    public EquippedItems EquippedItems { get; set; }
    public EquippedPetInformation EquippedPetInformation { get; set; }
    public string EquippedTitle { get; set; }
    public GuildInformation GuildInformation { get; set; }
    public GuildLeaderInformation GuildLeaderInformation { get; set; }
    public PublicCraftlandMaps PublicCraftlandMaps { get; set; }
}

public class EquippedItems
{
    public Profile Profile { get; set; }
}

public class Profile
{
    public List<string> Clothes { get; set; }
    public List<int> EquippedSkills { get; set; }
    public List<ExternalItem> ExternalItems { get; set; }
}

public class ExternalItem
{
    public string Category { get; set; }
    public string ImageURL { get; set; }
    public long ItemID { get; set; }
}

public class EquippedPetInformation
{
    public int PetLevel { get; set; }
    public string PetName { get; set; }
    public string PetType { get; set; }
    public int PetXP { get; set; }
    public bool Selected { get; set; }
}

public class GuildInformation
{
    public int GuildCapacity { get; set; }
    public int GuildCurrentMembers { get; set; }
    public string GuildID { get; set; }
    public int GuildLevel { get; set; }
    public string GuildName { get; set; }
    public string LeaderID { get; set; }
}

public class GuildLeaderInformation
{
    public DateTime LeaderAccountCreatedTime { get; set; }
    public List<long> LeaderAnimations { get; set; }
    public string LeaderAvatarImage { get; set; }
    public int LeaderBPBadges { get; set; }
    public int LeaderBRPoints { get; set; }
    public string LeaderBannerImage { get; set; }
    public int LeaderCSPoints { get; set; }
    public DateTime LeaderLastLoginTime { get; set; }
    public int LeaderLevel { get; set; }
    public int LeaderLikes { get; set; }
    public string LeaderName { get; set; }
    public long LeaderPin { get; set; }
    public string LeaderTitle { get; set; }
    public string LeaderUID { get; set; }
    public int LeaderXP { get; set; }
}

public class PublicCraftlandMaps
{
    public Dictionary<string, string> MapCodes { get; set; }
}
