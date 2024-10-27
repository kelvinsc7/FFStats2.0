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
public class NullableIntConverter : JsonConverter<int?>
{
    public override int? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType == JsonTokenType.String)
        {
            var stringValue = reader.GetString();
            
            // Tenta converter a string para um número inteiro.
            if (int.TryParse(stringValue, out int intValue))
            {
                return intValue;
            }
            else
            {
                return null; // Retorna nulo se não puder converter para int.
            }
        }
        else if (reader.TokenType == JsonTokenType.Number)
        {
            return reader.GetInt32(); // Se já for um número, retorna o valor inteiro.
        }
        
        return null; // Retorna nulo para qualquer outro tipo inesperado.
    }

    public override void Write(Utf8JsonWriter writer, int? value, JsonSerializerOptions options)
    {
        if (value.HasValue)
        {
            writer.WriteNumberValue(value.Value); // Serializa como número se houver valor.
        }
        else
        {
            writer.WriteNullValue(); // Se for nulo, escreve um valor nulo.
        }
    }
}
public class LeaderAnimationsConverter : JsonConverter<List<int?>>
{
    public override List<int?> Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        // Se o valor for uma string
        if (reader.TokenType == JsonTokenType.String)
        {
            var stringValue = reader.GetString();
            if (stringValue == "Not Found")
            {
                return new List<int?>(); // Retorna uma lista vazia ou pode retornar null, conforme sua preferência
            }
        }
        
        // Se o valor for um array
        if (reader.TokenType == JsonTokenType.StartArray)
        {
            var animations = new List<int?>();

            while (reader.Read() && reader.TokenType != JsonTokenType.EndArray)
            {
                if (reader.TokenType == JsonTokenType.Number)
                {
                    animations.Add(reader.GetInt32());
                }
                else
                {
                    animations.Add(null); // Se não for número, adiciona null
                }
            }

            return animations;
        }

        throw new JsonException("Formato inesperado para 'Leader Animations'.");
    }

    public override void Write(Utf8JsonWriter writer, List<int?> value, JsonSerializerOptions options)
    {
        if (value == null || value.Count == 0)
        {
            writer.WriteStringValue("Not Found"); // Se a lista estiver vazia ou nula, escreve "Not Found"
        }
        else
        {
            writer.WriteStartArray();
            foreach (var item in value)
            {
                if (item.HasValue)
                {
                    writer.WriteNumberValue(item.Value);
                }
                else
                {
                    writer.WriteNullValue(); // Escreve null se não houver valor
                }
            }
            writer.WriteEndArray();
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
    [JsonConverter(typeof(NullableIntConverter))]
    public int? AccountBooyahPassBadges { get; set; }

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
    [JsonConverter(typeof(NullableIntConverter))]
    public int? BRRankPoints { get; set; }

    [JsonPropertyName("CS Rank Points")]
    [JsonConverter(typeof(NullableIntConverter))]
    public int? CSRankPoints { get; set; }

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
    [JsonConverter(typeof(NullableIntConverter))]
    public int? GuildCapacity { get; set; }

    [JsonPropertyName("Guild Current Members")]
    [JsonConverter(typeof(NullableIntConverter))]
    public int? GuildCurrentMembers { get; set; }

    [JsonPropertyName("Guild ID")]
    public string GuildId { get; set; }

    [JsonPropertyName("Guild Level")]
    [JsonConverter(typeof(NullableIntConverter))]
    public int? GuildLevel { get; set; }

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
    [JsonConverter(typeof(LeaderAnimationsConverter))]
    public List<int?> LeaderAnimations { get; set; }

    [JsonPropertyName("Leader Avatar Image")]
    public string LeaderAvatarImage { get; set; }

    [JsonPropertyName("Leader BP Badges")]
    [JsonConverter(typeof(NullableIntConverter))]
    public int? LeaderBPBadges { get; set; }

    [JsonPropertyName("Leader BR Points")]
    [JsonConverter(typeof(NullableIntConverter))]
    public int? LeaderBRPoints { get; set; }

    [JsonPropertyName("Leader Banner Image")]
    public string LeaderBannerImage { get; set; }

    [JsonPropertyName("Leader CS Points")]
    [JsonConverter(typeof(NullableIntConverter))]
    public int? LeaderCSPoints { get; set; }

    [JsonPropertyName("Leader Last Login Time (GMT 0530)")]
    public string LeaderLastLoginTime { get; set; }
    
    [JsonPropertyName("Leader Level")]
    [JsonConverter(typeof(NullableIntConverter))]
    public int? LeaderLevel { get; set; }

    [JsonPropertyName("Leader Likes")]
    [JsonConverter(typeof(NullableIntConverter))]
    public int? LeaderLikes { get; set; }

    [JsonPropertyName("Leader Name")]
    public string LeaderName { get; set; }

    [JsonPropertyName("Leader Pin")]
    [JsonConverter(typeof(NullableIntConverter))]
    public int? LeaderPin { get; set; }

    [JsonPropertyName("Leader Title")]
    public string LeaderTitle { get; set; }

    [JsonPropertyName("Leader UID")]
    public string LeaderUID { get; set; }

    [JsonPropertyName("Leader XP")]
    [JsonConverter(typeof(NullableIntConverter))]
    public int? LeaderXP { get; set; }
}

public class PublicCraftlandMaps
{
    [JsonPropertyName("Map Codes")]
    public string MapCodes { get; set; }
}
