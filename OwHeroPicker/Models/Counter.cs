namespace OwHeroPicker.Models;

/// <summary>
/// 英雄克制关系
/// </summary>
public class CounterRelation
{
    public string HeroId { get; set; } = string.Empty;
    public Dictionary<string, int> Counters { get; set; } = new();
    // 正数表示克制，负数表示被克制
    // 例如: {"dva": 2, "reinhardt": -1} 表示克制D.Va(+2)，被莱因哈特克制(-1)
}

/// <summary>
/// 克制信息显示
/// </summary>
public class CounterInfo
{
    public Hero Hero { get; set; } = null!;
    public int Score { get; set; }
    public bool IsCounter => Score > 0;  // 我方克制对方
    public bool IsCounteredBy => Score < 0;  // 我方被对方克制
    
    // 威胁等级：用于分组显示
    public bool IsSevere => Score >= 15;  // 致命威胁/强力克制
    public bool IsModerate => Score >= 10 && Score < 15;  // 一般威胁
    public bool IsMinor => Score < 10;  // 轻微
    
    // 星级显示（1-3星）
    public int Stars => Score switch
    {
        >= 20 => 3,
        >= 12 => 2,
        _ => 1
    };
    
    public string ScoreText => Score switch
    {
        >= 20 => "强克",
        >= 12 => "中克",
        _ => "轻克"
    };
    
    // Tier 标签（S/A/B）
    public string TierText => Score switch
    {
        >= 20 => "S",
        >= 12 => "A",
        _ => "B"
    };
    
    // 边框粗细（强克更粗）
    public int BorderWidth => Score switch
    {
        >= 20 => 3,
        >= 12 => 2,
        _ => 1
    };
}
