using OwHeroPicker.Models;

namespace OwHeroPicker.Data;

public static class HeroData
{
    public static List<Hero> Heroes { get; } = new()
    {
        // 坦克 (13个)
        new Hero { Id = "dva", Name = "D.Va", NameEn = "D.Va", Role = HeroRole.Tank, AvatarPath = "dva.png", 
            Aliases = new() { "DVA", "dva", "迪娃", "宋哈娜", "迪瓦", "机甲", "小迪瓦", "小萝莉" } },
        new Hero { Id = "orisa", Name = "奥丽莎", NameEn = "Orisa", Role = HeroRole.Tank, AvatarPath = "orisa.png", 
            Aliases = new() { "orisa", "奥莉莎" } },
        new Hero { Id = "doomfist", Name = "末日铁拳", NameEn = "Doomfist", Role = HeroRole.Tank, AvatarPath = "doomfist.png", 
            Aliases = new() { "doomfist", "铁拳", "末日" } },
        new Hero { Id = "junkerqueen", Name = "渣客女王", NameEn = "Junker Queen", Role = HeroRole.Tank, AvatarPath = "junker-queen.png", 
            Aliases = new() { "女王", "JQ", "渣克女王" } },
        new Hero { Id = "mauga", Name = "毛加", NameEn = "Mauga", Role = HeroRole.Tank, AvatarPath = "mauga.webp", 
            Aliases = new() { "mauga" } },
        new Hero { Id = "ramattra", Name = "拉玛刹", NameEn = "Ramattra", Role = HeroRole.Tank, AvatarPath = "ramattra.png", 
            Aliases = new() { "拉马刹" } },
        new Hero { Id = "reinhardt", Name = "莱因哈特", NameEn = "Reinhardt", Role = HeroRole.Tank, AvatarPath = "reinhardt.webp", 
            Aliases = new() { "大锤", "莱茵哈特", "王大锤" } },
        new Hero { Id = "roadhog", Name = "路霸", NameEn = "Roadhog", Role = HeroRole.Tank, AvatarPath = "roadhog.png", 
            Aliases = new() { "猪", "猪头", "胖子", "肥猪", "屠夫" } },
        new Hero { Id = "sigma", Name = "西格玛", NameEn = "Sigma", Role = HeroRole.Tank, AvatarPath = "sigma.webp", 
            Aliases = new() { "sigma", "希格玛" } },
        new Hero { Id = "winston", Name = "温斯顿", NameEn = "Winston", Role = HeroRole.Tank, AvatarPath = "winston.png", 
            Aliases = new() { "猩猩", "科学家", "黄旭东", "猴子" } },
        new Hero { Id = "wreckingball", Name = "破坏球", NameEn = "Wrecking Ball", Role = HeroRole.Tank, AvatarPath = "wrecking_ball.webp", 
            Aliases = new() { "球", "仓鼠", "哈蒙德", "wrecking_ball" } },
        new Hero { Id = "zarya", Name = "查莉娅", NameEn = "Zarya", Role = HeroRole.Tank, AvatarPath = "zarya.webp", 
            Aliases = new() { "毛妹", "查丽娅", "查里雅", "女汉子" } },
        new Hero { Id = "hazard", Name = "骇灾", NameEn = "Hazard", Role = HeroRole.Tank, AvatarPath = "hazard.webp", 
            Aliases = new() { "hazard" } },
        
        // 输出 (18个)
        new Hero { Id = "ashe", Name = "艾什", NameEn = "Ashe", Role = HeroRole.Damage, AvatarPath = "ashe.webp", 
            Aliases = new() { "ashe", "爱什" } },
        new Hero { Id = "bastion", Name = "堡垒", NameEn = "Bastion", Role = HeroRole.Damage, AvatarPath = "bastion.png", 
            Aliases = new() { "bastion", "全场最佳" } },
        new Hero { Id = "cassidy", Name = "卡西迪", NameEn = "Cassidy", Role = HeroRole.Damage, AvatarPath = "cassidy.png", 
            Aliases = new() { "麦克雷", "牛仔", "麦卡利", "装X" } },
        new Hero { Id = "echo", Name = "回声", NameEn = "Echo", Role = HeroRole.Damage, AvatarPath = "echo.png", 
            Aliases = new() { "echo", "艾科" } },
        new Hero { Id = "genji", Name = "源氏", NameEn = "Genji", Role = HeroRole.Damage, AvatarPath = "genji.png", 
            Aliases = new() { "genji", "忍者", "幼儿园", "根基", "疯狗", "尤金诺" } },
        new Hero { Id = "hanzo", Name = "半藏", NameEn = "Hanzo", Role = HeroRole.Damage, AvatarPath = "hanzo.png", 
            Aliases = new() { "hanzo", "弓箭手", "汉子", "小狙", "随缘箭法" } },
        new Hero { Id = "junkrat", Name = "狂鼠", NameEn = "Junkrat", Role = HeroRole.Damage, AvatarPath = "junkrat.png", 
            Aliases = new() { "炸弹人", "老鼠", "黄鼠" } },
        new Hero { Id = "mei", Name = "美", NameEn = "Mei", Role = HeroRole.Damage, AvatarPath = "mei.webp", 
            Aliases = new() { "mei", "小美", "冰女", "冻住", "冰箱" } },
        new Hero { Id = "pharah", Name = "法老之鹰", NameEn = "Pharah", Role = HeroRole.Damage, AvatarPath = "pharah.png", 
            Aliases = new() { "法鸡", "飞机", "法拉", "双飞" } },
        new Hero { Id = "reaper", Name = "死神", NameEn = "Reaper", Role = HeroRole.Damage, AvatarPath = "reaper.png", 
            Aliases = new() { "reaper", "收割者", "幽灵", "呆呆呆" } },
        new Hero { Id = "sojourn", Name = "索杰恩", NameEn = "Sojourn", Role = HeroRole.Damage, AvatarPath = "sojourn.webp", 
            Aliases = new() { "索琼" } },
        new Hero { Id = "soldier76", Name = "士兵：76", NameEn = "Soldier: 76", Role = HeroRole.Damage, AvatarPath = "soldier-76.png", 
            Aliases = new() { "76", "士兵" } },
        new Hero { Id = "sombra", Name = "黑影", NameEn = "Sombra", Role = HeroRole.Damage, AvatarPath = "sombra.png", 
            Aliases = new() { "sombra", "黑客" } },
        new Hero { Id = "symmetra", Name = "秩序之光", NameEn = "Symmetra", Role = HeroRole.Damage, AvatarPath = "symmetra.png", 
            Aliases = new() { "光子", "激光", "阿三妹", "辛梅塔", "摄像头", "传送门" } },
        new Hero { Id = "torbjorn", Name = "托比昂", NameEn = "Torbjörn", Role = HeroRole.Damage, AvatarPath = "torbjorn.png", 
            Aliases = new() { "矮子", "工程师", "科比", "矮人", "炮台" } },
        new Hero { Id = "tracer", Name = "猎空", NameEn = "Tracer", Role = HeroRole.Damage, AvatarPath = "tracer.webp", 
            Aliases = new() { "闪光", "裂空" } },
        new Hero { Id = "venture", Name = "探奇", NameEn = "Venture", Role = HeroRole.Damage, AvatarPath = "venture.webp", 
            Aliases = new() { "venture", "探险家" } },
        new Hero { Id = "widowmaker", Name = "黑百合", NameEn = "Widowmaker", Role = HeroRole.Damage, AvatarPath = "widowmaker.webp", 
            Aliases = new() { "寡妇", "狙击手", "狙", "大狙" } },
        new Hero { Id = "freya", Name = "芙蕾雅", NameEn = "Freya", Role = HeroRole.Damage, AvatarPath = "freya.webp", 
            Aliases = new() { "freya" } },
        new Hero { Id = "zhanqiu", Name = "斩仇", NameEn = "Zhanqiu", Role = HeroRole.Damage, AvatarPath = "zhanqiu.webp", 
            Aliases = new() { "斩仇" } },
        
        // 支援 (12个)
        new Hero { Id = "ana", Name = "安娜", NameEn = "Ana", Role = HeroRole.Support, AvatarPath = "ana.webp", 
            Aliases = new() { "ana", "奶奶" } },
        new Hero { Id = "baptiste", Name = "巴蒂斯特", NameEn = "Baptiste", Role = HeroRole.Support, AvatarPath = "baptiste.webp", 
            Aliases = new() { "巴普", "黑爸" } },
        new Hero { Id = "brigitte", Name = "布里吉塔", NameEn = "Brigitte", Role = HeroRole.Support, AvatarPath = "brigitte.png", 
            Aliases = new() { "布丽吉塔", "小锤" } },
        new Hero { Id = "illari", Name = "伊拉锐", NameEn = "Illari", Role = HeroRole.Support, AvatarPath = "illari.webp", 
            Aliases = new() { "太阳女" } },
        new Hero { Id = "juno", Name = "朱诺", NameEn = "Juno", Role = HeroRole.Support, AvatarPath = "juno.webp", 
            Aliases = new() { "juno", "朱娜" } },
        new Hero { Id = "kiriko", Name = "雾子", NameEn = "Kiriko", Role = HeroRole.Support, AvatarPath = "kiriko.webp", 
            Aliases = new() { "狐狸", "kiriko" } },
        new Hero { Id = "lifeweaver", Name = "生命之梭", NameEn = "Lifeweaver", Role = HeroRole.Support, AvatarPath = "lifeweaver.png", 
            Aliases = new() { "花男", "织梦者" } },
        new Hero { Id = "lucio", Name = "卢西奥", NameEn = "Lúcio", Role = HeroRole.Support, AvatarPath = "lucio.png", 
            Aliases = new() { "DJ", "音乐家", "lucio" } },
        new Hero { Id = "mercy", Name = "天使", NameEn = "Mercy", Role = HeroRole.Support, AvatarPath = "mercy.png", 
            Aliases = new() { "mercy", "奶妈", "安吉拉", "慈悲" } },
        new Hero { Id = "moira", Name = "莫伊拉", NameEn = "Moira", Role = HeroRole.Support, AvatarPath = "moira.png", 
            Aliases = new() { "moira" } },
        new Hero { Id = "zenyatta", Name = "禅雅塔", NameEn = "Zenyatta", Role = HeroRole.Support, AvatarPath = "zenyatta.webp", 
            Aliases = new() { "和尚", "机器僧" } },
        new Hero { Id = "wuyang", Name = "无漾", NameEn = "Wuyang", Role = HeroRole.Support, AvatarPath = "wuyang.webp", 
            Aliases = new() { "wuyang" } },
    };

    public static Hero? GetHeroById(string id) => Heroes.FirstOrDefault(h => h.Id == id);
    
    public static List<Hero> GetHeroesByRole(HeroRole role) => Heroes.Where(h => h.Role == role).ToList();

    public static List<Hero> Tanks => GetHeroesByRole(HeroRole.Tank);
    public static List<Hero> Damages => GetHeroesByRole(HeroRole.Damage);
    public static List<Hero> Supports => GetHeroesByRole(HeroRole.Support);

    /// <summary>
    /// 搜索英雄 - 支持模糊搜索、英文搜索、外号搜索
    /// </summary>
    public static List<Hero> Search(string keyword)
    {
        if (string.IsNullOrWhiteSpace(keyword))
            return Heroes.ToList();

        keyword = keyword.ToLower().Trim();
        
        return Heroes.Where(h =>
            h.Name.ToLower().Contains(keyword) ||
            h.NameEn.ToLower().Contains(keyword) ||
            h.Id.ToLower().Contains(keyword) ||
            h.Aliases.Any(a => a.ToLower().Contains(keyword))
        ).ToList();
    }
}
