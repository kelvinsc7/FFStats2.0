using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Text.Json.Serialization;


public class freeffapi
{
    public async Task<PlayerStats> GetPlayerStatsAsync(string uid)
    {
        string url = $"https://free-ff-api-src-5plp.onrender.com/api/v1/playerstats?region=BR&uid={uid}";
        
        using HttpClient client = new HttpClient();
        var response = await client.GetAsync(url);
        response.EnsureSuccessStatusCode();
        
        var content = await response.Content.ReadAsStringAsync();
        var playerStats = JsonSerializer.Deserialize<PlayerStats>(content, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });
    
        return playerStats;
    }
}
public class PlayerStats
{
    public SoloStats SoloStats { get; set; }
    public DuoStats DuoStats { get; set; }
    public QuadStats QuadStats { get; set; }
}

public class SoloStats
{
    public string AccountId { get; set; }
    public int GamesPlayed { get; set; }
    public int Wins { get; set; }
    public int Kills { get; set; }
    public DetailedStats DetailedStats { get; set; }
}

public class DuoStats
{
    public string AccountId { get; set; }
    public int GamesPlayed { get; set; }
    public int Wins { get; set; }
    public int Kills { get; set; }
    public DetailedStats DetailedStats { get; set; }
}

public class QuadStats
{
    public string AccountId { get; set; }
    public int GamesPlayed { get; set; }
    public int Wins { get; set; }
    public int Kills { get; set; }
    public DetailedStats DetailedStats { get; set; }
}

public class DetailedStats
{
    public int Deaths { get; set; }
    public int TopNTimes { get; set; }
    public int DistanceTravelled { get; set; }
    public int SurvivalTime { get; set; }
    public int HighestKills { get; set; }
    public int Damage { get; set; }
    public int Headshots { get; set; }
    public int HeadshotKills { get; set; }
    public int PickUps { get; set; }
    public int Revives { get; set; }        // Nullable if DuoStats doesn't have it
    public int RoadKills { get; set; }     // Nullable if QuadStats doesn't have it
    public int KnockDown { get; set; }     // Nullable if QuadStats doesn't have it
}
