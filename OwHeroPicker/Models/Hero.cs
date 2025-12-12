namespace OwHeroPicker.Models;

public enum HeroRole
{
    Tank,    // 坦克
    Damage,  // 输出
    Support  // 支援
}

public enum HeroRating
{
    Unrated,  // 未评级
    Good,     // 不错哦
    Average,  // 一般般
    Bad       // 不好用
}

public class Hero
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string NameEn { get; set; } = string.Empty;
    public HeroRole Role { get; set; }
    public List<string> Aliases { get; set; } = new();
    public string? AvatarPath { get; set; }
    public string? WikiUrl { get; set; }

    public string RoleDisplayName => Role switch
    {
        HeroRole.Tank => "坦克",
        HeroRole.Damage => "输出",
        HeroRole.Support => "支援",
        _ => "未知"
    };

    public string GetWikiUrl()
    {
        if (!string.IsNullOrEmpty(WikiUrl)) return WikiUrl;
        return $"https://overwatch.huijiwiki.com/wiki/{Uri.EscapeDataString(Name)}";
    }
}

public class HeroWithRating
{
    public Hero Hero { get; set; } = null!;
    public HeroRating Rating { get; set; } = HeroRating.Unrated;
}
