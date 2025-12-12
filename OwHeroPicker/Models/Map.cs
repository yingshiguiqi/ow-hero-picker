namespace OwHeroPicker.Models;

public enum MapType
{
    Control,    // 抢点图
    Push,       // 机动推进图
    Flashpoint, // 闪点图
    Escort,     // 纯推车图
    Hybrid      // 混合推车图
}

public class GameMap
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public MapType Type { get; set; }
    public string? ImagePath { get; set; }
    public List<SubMap>? SubMaps { get; set; }

    public string TypeDisplayName => Type switch
    {
        MapType.Control => "抢点图",
        MapType.Push => "机动推进图",
        MapType.Flashpoint => "闪点图",
        MapType.Escort => "纯推车图",
        MapType.Hybrid => "混合推车图",
        _ => "未知"
    };
}

public class SubMap
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? Section { get; set; }
    public string? ImagePath { get; set; }
}
