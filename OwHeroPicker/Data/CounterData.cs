using OwHeroPicker.Models;

namespace OwHeroPicker.Data;

public static class CounterData
{
    // 英雄弱点描述
    public static Dictionary<string, string> HeroWeaknessNotes { get; } = new()
    {
        ["dva"] = "D.Va害怕在掩体偏少的地形上对面具备持续高伤害的消耗",
        ["doomfist"] = "铁拳害怕控制技能，还有拉扯的时候自己家后排没了",
        ["reinhardt"] = "莱因哈特害怕远程消耗和绕后",
        ["winston"] = "温斯顿害怕高爆发和控制",
        ["roadhog"] = "路霸害怕反奶和远程消耗",
        ["zarya"] = "查莉娅害怕远程消耗",
        ["sigma"] = "西格玛害怕近战突脸和控制",
        ["orisa"] = "奥丽莎害怕远程消耗和绕后",
        ["hazard"] = "骇灾害怕远程消耗和反制",
        ["junkerqueen"] = "渣客女王害怕风筝和反奶",
        ["mauga"] = "毛加害怕反奶和远程消耗",
        ["ramattra"] = "拉玛刹害怕远程消耗和机动性英雄",
        ["wreckingball"] = "破坏球害怕控制技能",
        ["zhanqiu"] = "斩仇害怕反奶、高爆发和远程消耗",
    };

    // 克制关系数据：记录谁克制谁
    // 格式：被克制的英雄 -> 克制他的英雄列表
    public static Dictionary<string, List<string>> CounteredBy { get; } = new()
    {
        // ===== 坦克被克制 =====
        ["dva"] = new() { "junkerqueen", "sigma", "zarya", "moira", "zenyatta", "ana", "symmetra", "echo", "sombra", "widowmaker", "mei", "hanzo", "zhanqiu" },
        ["doomfist"] = new() { "roadhog", "zarya", "orisa", "sombra", "cassidy", "tracer", "ana", "juno", "brigitte" },
        ["reinhardt"] = new() { "winston", "ramattra", "pharah", "ashe", "echo", "bastion", "mei", "junkrat", "torbjorn", "ana", "baptiste", "brigitte", "zenyatta", "lucio", "illari", "zhanqiu" },
        ["hazard"] = new() { "dva", "sigma", "doomfist", "roadhog", "orisa", "zarya", "tracer", "sojourn", "torbjorn", "echo", "ana", "zenyatta" },
        ["roadhog"] = new() { "junkerqueen", "zarya", "orisa", "doomfist", "mauga", "reinhardt", "echo", "widowmaker", "mei", "pharah", "reaper", "sojourn", "genji", "ashe", "hanzo", "sombra", "zenyatta", "ana", "baptiste", "brigitte" },
        ["junkerqueen"] = new() { "orisa", "doomfist", "mauga", "hazard", "zarya", "pharah", "mei", "torbjorn", "sojourn", "echo", "juno", "ana", "lucio", "kiriko" },
        ["sigma"] = new() { "doomfist", "winston", "reinhardt", "ramattra", "symmetra", "mei", "sombra", "pharah", "kiriko", "brigitte", "zenyatta", "lifeweaver", "moira", "zhanqiu" },
        ["mauga"] = new() { "sigma", "zarya", "orisa", "pharah", "echo", "reaper", "sojourn", "widowmaker", "zenyatta", "ana", "juno" },
        ["winston"] = new() { "hazard", "mauga", "junkerqueen", "dva", "torbjorn", "bastion", "reaper", "cassidy", "echo", "junkrat", "lucio", "illari", "brigitte", "zenyatta", "zhanqiu" },
        ["orisa"] = new() { "sigma", "winston", "zarya", "wreckingball", "baptiste", "hanzo", "ashe", "sojourn", "tracer", "junkrat", "echo", "widowmaker", "pharah", "bastion", "ana", "illari", "zenyatta" },
        ["wreckingball"] = new() { "orisa", "dva", "doomfist", "mauga", "roadhog", "sombra", "cassidy", "tracer", "sojourn", "torbjorn", "ana", "brigitte", "lucio" },
        ["ramattra"] = new() { "sigma", "junkerqueen", "mauga", "roadhog", "hazard", "bastion", "pharah", "genji", "torbjorn", "sojourn", "reaper", "mei", "tracer", "echo", "juno", "ana", "baptiste", "illari", "zenyatta", "zhanqiu" },
        ["zarya"] = new() { "winston", "wreckingball", "ramattra", "reinhardt", "widowmaker", "mei", "ashe", "zenyatta", "lifeweaver" },

        // ===== 输出被克制 =====
        ["ashe"] = new() { "winston", "ramattra", "hazard", "hanzo", "widowmaker", "tracer", "sojourn", "zenyatta", "kiriko", "illari", "zhanqiu" },
        ["reaper"] = new() { "sigma", "zarya", "orisa", "ashe", "hanzo", "pharah", "widowmaker", "cassidy", "echo", "tracer", "sojourn", "torbjorn", "genji", "symmetra", "ana", "baptiste", "brigitte", "zenyatta", "lucio", "illari", "juno" },
        ["bastion"] = new() { "sigma", "junkerqueen", "dva", "hazard", "mauga", "ashe", "hanzo", "widowmaker", "echo", "junkrat", "pharah", "sojourn", "genji", "symmetra", "ana", "zenyatta", "illari" },
        ["sojourn"] = new() { "winston", "widowmaker", "echo", "tracer", "symmetra" },
        ["cassidy"] = new() { "hazard", "zarya", "orisa", "mauga", "mei", "ashe", "sojourn", "hanzo", "soldier76", "torbjorn", "widowmaker", "zenyatta", "baptiste", "ana", "illari" },
        ["soldier76"] = new() { "sigma", "winston", "doomfist", "wreckingball", "junkerqueen", "mauga", "hazard", "dva", "sojourn", "reaper", "bastion", "ashe", "widowmaker", "hanzo", "zenyatta", "baptiste", "illari", "zhanqiu" },
        ["echo"] = new() { "winston", "zarya", "ashe", "soldier76", "widowmaker", "ana", "baptiste", "illari" },
        ["sombra"] = new() { "winston", "zarya", "dva", "torbjorn", "tracer", "soldier76", "sojourn", "symmetra", "cassidy", "brigitte", "lucio" },
        ["symmetra"] = new() { "winston", "zarya", "venture", "pharah", "widowmaker", "echo", "ashe", "ana", "zenyatta", "brigitte", "kiriko" },
        ["genji"] = new() { "winston", "zarya", "pharah", "echo", "torbjorn", "cassidy", "brigitte", "zenyatta" },
        ["torbjorn"] = new() { "orisa", "zarya", "mei", "widowmaker", "echo", "junkrat", "bastion", "pharah", "hanzo", "ashe", "sojourn", "zenyatta", "ana" },
        ["hanzo"] = new() { "wreckingball", "winston", "hazard", "doomfist", "sombra", "echo", "tracer", "genji", "pharah", "lucio", "venture", "juno", "kiriko", "moira", "zhanqiu" },
        ["tracer"] = new() { "dva", "cassidy", "torbjorn", "baptiste", "brigitte", "illari", "juno" },
        ["junkrat"] = new() { "zarya", "ashe", "hanzo", "pharah", "echo", "tracer", "genji", "juno", "zenyatta" },
        ["venture"] = new() { "roadhog", "doomfist", "orisa", "sojourn", "echo", "pharah", "tracer", "cassidy", "juno", "kiriko", "brigitte", "lucio", "mercy", "moira" },
        ["mei"] = new() { "ashe", "pharah", "widowmaker", "cassidy", "echo", "hanzo", "reaper", "venture", "zenyatta", "baptiste", "ana", "juno", "illari" },
        ["widowmaker"] = new() { "wreckingball", "doomfist", "sigma", "winston", "widowmaker", "sombra", "tracer", "genji", "kiriko", "lucio", "zhanqiu" },
        ["pharah"] = new() { "dva", "wreckingball", "ashe", "echo", "soldier76", "widowmaker", "baptiste", "illari" },

        // ===== 支援被克制 =====
        ["ana"] = new() { "orisa", "hazard", "junkerqueen", "wreckingball", "doomfist", "winston", "tracer", "sombra", "widowmaker", "venture", "hanzo", "genji", "kiriko", "zenyatta", "zhanqiu" },
        ["lifeweaver"] = new() { "mauga", "junkerqueen", "sombra", "echo", "ashe", "widowmaker", "venture", "pharah", "ana", "zenyatta" },
        ["baptiste"] = new() { "winston", "hazard", "junkerqueen", "genji", "hanzo", "widowmaker", "sojourn", "illari", "ana", "zenyatta", "moira", "zhanqiu" },
        ["lucio"] = new() { "pharah", "sombra", "echo", "zenyatta", "illari", "juno", "ana", "baptiste" },
        ["brigitte"] = new() { "hazard", "ramattra", "junkerqueen", "pharah", "mei", "widowmaker", "echo", "junkrat", "torbjorn", "symmetra", "ashe", "hanzo", "bastion", "illari", "moira", "zenyatta", "ana", "baptiste", "zhanqiu" },
        ["mercy"] = new() { "dva", "hazard", "mauga", "junkerqueen", "wreckingball", "winston", "illari", "sombra", "echo", "ashe", "tracer", "soldier76", "sojourn", "juno", "ana" },
        ["kiriko"] = new() { "pharah", "tracer", "sojourn", "zenyatta" },
        ["juno"] = new() { "junkerqueen", "sombra", "sojourn", "illari", "ana", "zenyatta" },
        ["illari"] = new() { "winston", "sigma", "widowmaker", "sojourn", "ashe", "zenyatta", "zhanqiu" },
        ["moira"] = new() { "junkerqueen", "wreckingball", "pharah", "widowmaker", "echo", "tracer", "torbjorn", "ashe", "zenyatta", "juno", "ana", "baptiste" },
        ["zenyatta"] = new() { "wreckingball", "doomfist", "winston", "genji", "hanzo", "venture", "widowmaker", "sombra", "echo", "tracer", "sojourn", "kiriko", "zhanqiu" },
        
        // 斩仇
        ["zhanqiu"] = new() { "ana", "juno", "mercy", "echo", "pharah", "freya", "cassidy", "reaper", "torbjorn", "junkrat", "doomfist", "roadhog", "zarya", "mauga", "orisa" },
    };

    /// <summary>
    /// 获取克制某英雄的所有英雄（该英雄的弱点）
    /// </summary>
    public static List<CounterInfo> GetWeaknesses(string heroId)
    {
        var result = new List<CounterInfo>();
        if (CounteredBy.TryGetValue(heroId, out var counterIds))
        {
            foreach (var counterId in counterIds)
            {
                var hero = HeroData.GetHeroById(counterId);
                if (hero != null)
                {
                    result.Add(new CounterInfo { Hero = hero, Score = 15 }); // 默认分数
                }
            }
        }
        return result;
    }

    /// <summary>
    /// 获取被某英雄克制的所有英雄（该英雄的优势）
    /// </summary>
    public static List<CounterInfo> GetStrengths(string heroId)
    {
        var result = new List<CounterInfo>();
        foreach (var (targetId, counterIds) in CounteredBy)
        {
            if (counterIds.Contains(heroId))
            {
                var hero = HeroData.GetHeroById(targetId);
                if (hero != null)
                {
                    result.Add(new CounterInfo { Hero = hero, Score = 15 }); // 默认分数
                }
            }
        }
        return result;
    }

    /// <summary>
    /// 获取英雄的弱点描述
    /// </summary>
    public static string? GetWeaknessNote(string heroId)
    {
        return HeroWeaknessNotes.TryGetValue(heroId, out var note) ? note : null;
    }
}

