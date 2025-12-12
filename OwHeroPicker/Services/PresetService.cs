using System.IO;
using System.Text.Json;
using System.Text.Json.Serialization;
using OwHeroPicker.Data;
using OwHeroPicker.Models;

namespace OwHeroPicker.Services;

/// <summary>
/// 预设配置服务 - 加载和管理地图英雄推荐预设
/// </summary>
public class PresetService
{
    private PresetConfig? _config;
    private readonly string _configPath;

    public PresetService()
    {
        // 配置文件路径 - 尝试多个可能的位置
        var baseDir = AppDomain.CurrentDomain.BaseDirectory;
        var possiblePaths = new[]
        {
            Path.Combine(baseDir, "预设配置-preset.json"),  // 发布目录
            Path.Combine(baseDir, "..", "..", "..", "..", "预设配置-preset.json"),  // dotnet run (bin/Debug/net8.0-windows)
            Path.Combine(baseDir, "..", "..", "..", "预设配置-preset.json"),  // 其他情况
            @"c:\AI\project\ow\预设配置-preset.json"  // 绝对路径备用
        };
        
        _configPath = possiblePaths.FirstOrDefault(File.Exists) 
                      ?? Path.Combine(baseDir, "预设配置-preset.json");
        
        System.Diagnostics.Debug.WriteLine($"配置文件路径: {_configPath}, 存在: {File.Exists(_configPath)}");
    }

    public void LoadConfig()
    {
        try
        {
            if (File.Exists(_configPath))
            {
                var json = File.ReadAllText(_configPath);
                _config = JsonSerializer.Deserialize<PresetConfig>(json, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
            }
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"加载预设配置失败: {ex.Message}");
        }
    }

    public void SaveConfig()
    {
        try
        {
            if (_config != null)
            {
                var json = JsonSerializer.Serialize(_config, new JsonSerializerOptions
                {
                    WriteIndented = true,
                    Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping
                });
                File.WriteAllText(_configPath, json);
            }
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"保存预设配置失败: {ex.Message}");
        }
    }

    /// <summary>
    /// 获取地图的英雄评级
    /// </summary>
    public MapHeroRatings GetMapRatings(string mapId, string? subMapId = null)
    {
        var result = new MapHeroRatings();
        
        if (_config == null)
        {
            LoadConfig();
        }

        if (_config?.Configurations == null)
            return result;

        // 标准化 subMapId：null 和空字符串视为相同
        var normalizedSubMapId = string.IsNullOrEmpty(subMapId) ? "" : subMapId;

        // 查找匹配的配置
        var config = _config.Configurations.FirstOrDefault(c => 
            c.MapId == mapId && (string.IsNullOrEmpty(c.SubMapId) ? "" : c.SubMapId) == normalizedSubMapId);
        
        // 如果没找到且有 subMapId，尝试查找该地图的任意配置作为回退
        if (config == null && !string.IsNullOrEmpty(subMapId))
        {
            config = _config.Configurations.FirstOrDefault(c => c.MapId == mapId);
        }

        if (config?.HeroRatings == null)
            return result;

        foreach (var rating in config.HeroRatings)
        {
            var hero = HeroData.GetHeroById(rating.HeroId);
            if (hero == null) continue;

            switch (rating.Rating)
            {
                case "不错哦":
                    result.Good.Add(hero);
                    break;
                case "一般般":
                    result.Average.Add(hero);
                    break;
                case "不好用":
                    result.Bad.Add(hero);
                    break;
            }
        }

        // 按职责排序
        result.Good = result.Good.OrderBy(h => h.Role).ThenBy(h => h.Name).ToList();
        result.Average = result.Average.OrderBy(h => h.Role).ThenBy(h => h.Name).ToList();
        result.Bad = result.Bad.OrderBy(h => h.Role).ThenBy(h => h.Name).ToList();

        return result;
    }

    /// <summary>
    /// 更新英雄评级
    /// </summary>
    public void UpdateHeroRating(string mapId, string? subMapId, string heroId, string rating)
    {
        if (_config == null)
        {
            LoadConfig();
            _config ??= new PresetConfig
            {
                Id = DateTime.Now.Ticks.ToString(),
                Name = "预设配置",
                Configurations = new List<MapConfiguration>()
            };
        }

        // 查找或创建配置
        var config = _config.Configurations?.FirstOrDefault(c => 
            c.MapId == mapId && c.SubMapId == (subMapId ?? mapId));

        if (config == null)
        {
            config = new MapConfiguration
            {
                MapId = mapId,
                SubMapId = subMapId ?? mapId,
                HeroRatings = new List<HeroRating>()
            };
            _config.Configurations ??= new List<MapConfiguration>();
            _config.Configurations.Add(config);
        }

        // 查找或创建英雄评级
        var heroRating = config.HeroRatings?.FirstOrDefault(r => r.HeroId == heroId);
        if (heroRating == null)
        {
            heroRating = new HeroRating { HeroId = heroId };
            config.HeroRatings ??= new List<HeroRating>();
            config.HeroRatings.Add(heroRating);
        }

        heroRating.Rating = rating;
        SaveConfig();
    }

    /// <summary>
    /// 获取所有已配置的地图
    /// </summary>
    public List<string> GetConfiguredMaps()
    {
        if (_config == null) LoadConfig();
        return _config?.Configurations?.Select(c => c.MapId).Distinct().ToList() ?? new List<string>();
    }

    /// <summary>
    /// 导出配置为JSON字符串
    /// </summary>
    public string ExportConfig()
    {
        if (_config == null) LoadConfig();
        return JsonSerializer.Serialize(_config, new JsonSerializerOptions
        {
            WriteIndented = true,
            Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping
        });
    }

    /// <summary>
    /// 从JSON字符串导入配置
    /// </summary>
    public bool ImportConfig(string json)
    {
        try
        {
            var config = JsonSerializer.Deserialize<PresetConfig>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
            if (config != null)
            {
                _config = config;
                SaveConfig();
                return true;
            }
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"导入配置失败: {ex.Message}");
        }
        return false;
    }

    /// <summary>
    /// 重置为出厂设置
    /// </summary>
    public void ResetToFactory()
    {
        // 重新加载原始配置文件
        LoadConfig();
    }

    /// <summary>
    /// 获取当前配置名称
    /// </summary>
    public string GetConfigName()
    {
        if (_config == null) LoadConfig();
        return _config?.Name ?? "未命名预设";
    }

    /// <summary>
    /// 设置配置名称
    /// </summary>
    public void SetConfigName(string name)
    {
        if (_config == null) LoadConfig();
        if (_config != null)
        {
            _config.Name = name;
            SaveConfig();
        }
    }

    /// <summary>
    /// 获取配置统计信息
    /// </summary>
    public (int mapCount, int heroCount) GetConfigStats()
    {
        if (_config == null) LoadConfig();
        int mapCount = _config?.Configurations?.Count ?? 0;
        int heroCount = _config?.Configurations?.Sum(c => c.HeroRatings?.Count ?? 0) ?? 0;
        return (mapCount, heroCount);
    }

    /// <summary>
    /// 移除英雄评级
    /// </summary>
    public void RemoveHeroRating(string mapId, string? subMapId, string heroId)
    {
        if (_config == null) LoadConfig();
        
        var config = _config?.Configurations?.FirstOrDefault(c => 
            c.MapId == mapId && c.SubMapId == (subMapId ?? mapId));

        if (config?.HeroRatings != null)
        {
            config.HeroRatings.RemoveAll(r => r.HeroId == heroId);
            SaveConfig();
        }
    }

    /// <summary>
    /// 清空地图配置
    /// </summary>
    public void ClearMapConfig(string mapId, string? subMapId)
    {
        if (_config == null) LoadConfig();
        
        var config = _config?.Configurations?.FirstOrDefault(c => 
            c.MapId == mapId && c.SubMapId == (subMapId ?? mapId));

        if (config != null)
        {
            config.HeroRatings?.Clear();
            SaveConfig();
        }
    }
}

public class PresetConfig
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = "";
    
    [JsonPropertyName("name")]
    public string Name { get; set; } = "";
    
    [JsonPropertyName("configurations")]
    public List<MapConfiguration>? Configurations { get; set; }
}

public class MapConfiguration
{
    [JsonPropertyName("mapId")]
    public string MapId { get; set; } = "";
    
    [JsonPropertyName("subMapId")]
    public string SubMapId { get; set; } = "";
    
    [JsonPropertyName("heroRatings")]
    public List<HeroRating>? HeroRatings { get; set; }
}

public class HeroRating
{
    [JsonPropertyName("heroId")]
    public string HeroId { get; set; } = "";
    
    [JsonPropertyName("rating")]
    public string Rating { get; set; } = "";
}

public class MapHeroRatings
{
    public List<Hero> Good { get; set; } = new();    // 不错哦 - 推荐
    public List<Hero> Average { get; set; } = new(); // 一般般 - 备选
    public List<Hero> Bad { get; set; } = new();     // 不好用 - 不推荐
}
