using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Text.Json.Serialization;


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
    [JsonPropertyName("Account Avatar Image")]
    public string AccountAvatarImage { get; set; }

    [JsonPropertyName("Account Banner Image")]
    public string AccountBannerImage { get; set; }

    [JsonPropertyName("Account Booyah Pass")]
    public string AccountBooyahPass { get; set; }

    [JsonPropertyName("Account Booyah Pass Badges")]
    public int AccountBooyahPassBadges { get; set; }

    [JsonPropertyName("Account Celebrity Status")]
    public string AccountCelebrityStatus { get; set; }

    [JsonPropertyName("Account Character ID")]
    public long AccountCharacterId { get; set; }

    [JsonPropertyName("Account Create Time (GMT 0530)")]
    public string AccountCreateTime { get; set; }

    [JsonPropertyName("Account Evo Access Badge")]
    public string AccountEvoAccessBadge { get; set; }

    [JsonPropertyName("Account Honor Score")]
    public int AccountHonorScore { get; set; }

    [JsonPropertyName("Account Language")]
    public string AccountLanguage { get; set; }

    [JsonPropertyName("Account Last Login (GMT 0530)")]
    public string AccountLastLogin { get; set; }

    [JsonPropertyName("Account Level")]
    public int AccountLevel { get; set; }

    [JsonPropertyName("Account Likes")]
    public int AccountLikes { get; set; }

    [JsonPropertyName("Account Name")]
    public string AccountName { get; set; }

    [JsonPropertyName("Account Pin Image")]
    public string AccountPinImage { get; set; }

    [JsonPropertyName("Account Region")]
    public string AccountRegion { get; set; }

    [JsonPropertyName("Account Signature")]
    public string AccountSignature { get; set; }

    [JsonPropertyName("Account UID")]
    public string AccountUID { get; set; }

    [JsonPropertyName("Account XP")]
    public int AccountXP { get; set; }

    [JsonPropertyName("BR Rank Points")]
    public int BRRankPoints { get; set; }

    [JsonPropertyName("CS Rank Points")]
    public int CSRankPoints { get; set; }

    [JsonPropertyName("Equipped Items")]
    public EquippedItems EquippedItems { get; set; }

    [JsonPropertyName("Equipped Pet Information")]
    public EquippedPetInformation EquippedPetInformation { get; set; }

    [JsonPropertyName("Equipped Title")]
    public string EquippedTitle { get; set; }

    [JsonPropertyName("Guild Information")]
    public GuildInformation GuildInformation { get; set; }

    [JsonPropertyName("Guild Leader Information")]
    public GuildLeaderInformation GuildLeaderInformation { get; set; }

    [JsonPropertyName("Public Craftland Maps")]
    public PublicCraftlandMaps PublicCraftlandMaps { get; set; }
}

public class EquippedItems
{
    [JsonPropertyName("profile")]
    public Profile Profile { get; set; }
}

public class Profile
{
    [JsonPropertyName("Clothes")]
    public List<string> Clothes { get; set; }

    [JsonPropertyName("Equipped Skills")]
    public List<int> EquippedSkills { get; set; }

    [JsonPropertyName("External Items")]
    public List<ExternalItem> ExternalItems { get; set; }
}

public class ExternalItem
{
    [JsonPropertyName("Category")]
    public string Category { get; set; }

    [JsonPropertyName("Image URL")]
    public string ImageUrl { get; set; }

    [JsonPropertyName("Item ID")]
    public int ItemId { get; set; }
}

public class EquippedPetInformation
{
    [JsonPropertyName("Pet Level")]
    public int PetLevel { get; set; }

    [JsonPropertyName("Pet Name")]
    public string PetName { get; set; }

    [JsonPropertyName("Pet Type")]
    public string PetType { get; set; }

    [JsonPropertyName("Pet XP")]
    public int PetXP { get; set; }

    [JsonPropertyName("Selected?")]
    public bool Selected { get; set; }
}

public class GuildInformation
{
    [JsonPropertyName("Guild Capacity")]
    public int GuildCapacity { get; set; }

    [JsonPropertyName("Guild Current Members")]
    public int GuildCurrentMembers { get; set; }

    [JsonPropertyName("Guild ID")]
    public string GuildId { get; set; }

    [JsonPropertyName("Guild Level")]
    public int GuildLevel { get; set; }

    [JsonPropertyName("Guild Name")]
    public string GuildName { get; set; }

    [JsonPropertyName("Leader ID")]
    public string LeaderId { get; set; }
}

public class GuildLeaderInformation
{
    [JsonPropertyName("Leader Ac Created Time (GMT 0530)")]
    public string LeaderAccountCreatedTime { get; set; }

    [JsonPropertyName("Leader Animations")]
    public List<int> LeaderAnimations { get; set; }

    [JsonPropertyName("Leader Avatar Image")]
    public string LeaderAvatarImage { get; set; }

    [JsonPropertyName("Leader BP Badges")]
    public int LeaderBPBadges { get; set; }

    [JsonPropertyName("Leader BR Points")]
    public int LeaderBRPoints { get; set; }

    [JsonPropertyName("Leader Banner Image")]
    public string LeaderBannerImage { get; set; }

    [JsonPropertyName("Leader CS Points")]
    public int LeaderCSPoints { get; set; }

    [JsonPropertyName("Leader Last Login Time (GMT 0530)")]
    public string LeaderLastLoginTime { get; set; }

    [JsonPropertyName("Leader Level")]
    public int LeaderLevel { get; set; }

    [JsonPropertyName("Leader Likes")]
    public int LeaderLikes { get; set; }

    [JsonPropertyName("Leader Name")]
    public string LeaderName { get; set; }

    [JsonPropertyName("Leader Pin")]
    public int? LeaderPin { get; set; }

    [JsonPropertyName("Leader Title")]
    public string LeaderTitle { get; set; }

    [JsonPropertyName("Leader UID")]
    public string LeaderUID { get; set; }

    [JsonPropertyName("Leader XP")]
    public int LeaderXP { get; set; }
}

public class PublicCraftlandMaps
{
    [JsonPropertyName("Map Codes")]
    public string MapCodes { get; set; }
}
