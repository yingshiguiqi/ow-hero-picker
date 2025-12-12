namespace OwHeroPicker.Data;

/// <summary>
/// 地图英雄推荐预设
/// </summary>
public static class MapPresets
{
    // 每个地图推荐的英雄ID列表，按优先级排序
    public static Dictionary<string, MapRecommendation> Presets { get; } = new()
    {
        // === 抢点图 ===
        ["ilios"] = new MapRecommendation
        {
            MapId = "ilios",
            Tanks = new() { "winston", "dva", "sigma", "zarya" },
            Damages = new() { "pharah", "echo", "tracer", "widowmaker", "hanzo" },
            Supports = new() { "lucio", "mercy", "kiriko", "ana" },
            Notes = "环境击杀地图，卢西奥必选，法鸡回声强势"
        },
        ["lijiang"] = new MapRecommendation
        {
            MapId = "lijiang",
            Tanks = new() { "winston", "dva", "wrecking_ball" },
            Damages = new() { "tracer", "genji", "pharah", "widowmaker" },
            Supports = new() { "lucio", "kiriko", "moira" },
            Notes = "高机动性地图，跳水英雄强势"
        },
        ["nepal"] = new MapRecommendation
        {
            MapId = "nepal",
            Tanks = new() { "winston", "dva", "sigma" },
            Damages = new() { "pharah", "echo", "tracer", "widowmaker" },
            Supports = new() { "lucio", "ana", "kiriko" },
            Notes = "圣所有环杀，村庄适合狙击"
        },
        ["oasis"] = new MapRecommendation
        {
            MapId = "oasis",
            Tanks = new() { "dva", "sigma", "winston" },
            Damages = new() { "pharah", "tracer", "genji", "widowmaker" },
            Supports = new() { "lucio", "kiriko", "mercy" },
            Notes = "花园有车可环杀"
        },
        ["busan"] = new MapRecommendation
        {
            MapId = "busan",
            Tanks = new() { "dva", "sigma", "reinhardt" },
            Damages = new() { "hanzo", "widowmaker", "tracer", "pharah" },
            Supports = new() { "ana", "lucio", "kiriko" },
            Notes = "神殿开阔适合狙击"
        },
        ["samoa"] = new MapRecommendation
        {
            MapId = "samoa",
            Tanks = new() { "winston", "dva", "sigma" },
            Damages = new() { "tracer", "genji", "pharah", "echo" },
            Supports = new() { "lucio", "kiriko", "ana" },
            Notes = "高机动地图"
        },
        ["antarctic"] = new MapRecommendation
        {
            MapId = "antarctic",
            Tanks = new() { "sigma", "dva", "zarya" },
            Damages = new() { "mei", "reaper", "tracer", "junkrat" },
            Supports = new() { "lucio", "moira", "kiriko" },
            Notes = "室内点位，近战英雄强势"
        },

        // === 推进图 ===
        ["esperanca"] = new MapRecommendation
        {
            MapId = "esperanca",
            Tanks = new() { "reinhardt", "sigma", "dva" },
            Damages = new() { "hanzo", "cassidy", "tracer", "sojourn" },
            Supports = new() { "ana", "lucio", "kiriko" },
            Notes = "中距离交战为主"
        },
        ["colosseo"] = new MapRecommendation
        {
            MapId = "colosseo",
            Tanks = new() { "reinhardt", "sigma", "zarya" },
            Damages = new() { "hanzo", "cassidy", "sojourn", "tracer" },
            Supports = new() { "ana", "lucio", "baptiste" },
            Notes = "开阔地形，远程英雄强势"
        },
        ["new_queen_street"] = new MapRecommendation
        {
            MapId = "new_queen_street",
            Tanks = new() { "reinhardt", "dva", "sigma" },
            Damages = new() { "cassidy", "hanzo", "tracer", "genji" },
            Supports = new() { "ana", "kiriko", "lucio" },
            Notes = "街道战斗"
        },
        ["runasapi"] = new MapRecommendation
        {
            MapId = "runasapi",
            Tanks = new() { "sigma", "dva", "winston" },
            Damages = new() { "pharah", "echo", "hanzo", "widowmaker" },
            Supports = new() { "ana", "mercy", "kiriko" },
            Notes = "高低差大，飞行英雄强势"
        },

        // === 闪点图 ===
        ["new_junk_city"] = new MapRecommendation
        {
            MapId = "new_junk_city",
            Tanks = new() { "junkerqueen", "reinhardt", "sigma" },
            Damages = new() { "junkrat", "reaper", "cassidy", "tracer" },
            Supports = new() { "kiriko", "ana", "lucio" },
            Notes = "狭窄空间，近战强势"
        },
        ["suravasa"] = new MapRecommendation
        {
            MapId = "suravasa",
            Tanks = new() { "sigma", "dva", "reinhardt" },
            Damages = new() { "hanzo", "cassidy", "tracer", "sojourn" },
            Supports = new() { "ana", "kiriko", "baptiste" },
            Notes = "中距离交战"
        },
        ["throne"] = new MapRecommendation
        {
            MapId = "throne",
            Tanks = new() { "reinhardt", "sigma", "zarya" },
            Damages = new() { "cassidy", "hanzo", "reaper", "tracer" },
            Supports = new() { "ana", "lucio", "kiriko" },
            Notes = "室内点位多"
        },

        // === 护送图 ===
        ["route66"] = new MapRecommendation
        {
            MapId = "route66",
            Tanks = new() { "sigma", "dva", "reinhardt" },
            Damages = new() { "widowmaker", "hanzo", "cassidy", "ashe" },
            Supports = new() { "ana", "baptiste", "kiriko" },
            Notes = "长距离狙击地图"
        },
        ["havana"] = new MapRecommendation
        {
            MapId = "havana",
            Tanks = new() { "sigma", "reinhardt", "dva" },
            Damages = new() { "widowmaker", "hanzo", "ashe", "pharah" },
            Supports = new() { "ana", "baptiste", "mercy" },
            Notes = "开阔地形，狙击强势"
        },
        ["dorado"] = new MapRecommendation
        {
            MapId = "dorado",
            Tanks = new() { "reinhardt", "sigma", "dva" },
            Damages = new() { "hanzo", "cassidy", "pharah", "junkrat" },
            Supports = new() { "ana", "lucio", "kiriko" },
            Notes = "高低差大"
        },
        ["junkertown"] = new MapRecommendation
        {
            MapId = "junkertown",
            Tanks = new() { "reinhardt", "sigma", "orisa" },
            Damages = new() { "bastion", "widowmaker", "hanzo", "junkrat" },
            Supports = new() { "ana", "baptiste", "mercy" },
            Notes = "第一段开阔，堡垒强势"
        },
        ["circuit_royal"] = new MapRecommendation
        {
            MapId = "circuit_royal",
            Tanks = new() { "sigma", "dva", "winston" },
            Damages = new() { "widowmaker", "hanzo", "ashe", "sojourn" },
            Supports = new() { "ana", "kiriko", "baptiste" },
            Notes = "狙击天堂"
        },
        ["watchpoint_gibraltar"] = new MapRecommendation
        {
            MapId = "watchpoint_gibraltar",
            Tanks = new() { "winston", "dva", "sigma" },
            Damages = new() { "widowmaker", "pharah", "tracer", "genji" },
            Supports = new() { "mercy", "ana", "kiriko" },
            Notes = "高机动地图"
        },
        ["rialto"] = new MapRecommendation
        {
            MapId = "rialto",
            Tanks = new() { "reinhardt", "sigma", "zarya" },
            Damages = new() { "hanzo", "widowmaker", "cassidy", "junkrat" },
            Supports = new() { "ana", "baptiste", "lucio" },
            Notes = "桥上狙击强势"
        },
        ["shambali"] = new MapRecommendation
        {
            MapId = "shambali",
            Tanks = new() { "reinhardt", "sigma", "dva" },
            Damages = new() { "widowmaker", "hanzo", "pharah", "echo" },
            Supports = new() { "ana", "mercy", "kiriko" },
            Notes = "高低差大，飞行强势"
        },

        // === 混合图 ===
        ["midtown"] = new MapRecommendation
        {
            MapId = "midtown",
            Tanks = new() { "reinhardt", "sigma", "dva" },
            Damages = new() { "cassidy", "hanzo", "tracer", "sojourn" },
            Supports = new() { "ana", "kiriko", "lucio" },
            Notes = "街道战斗"
        },
        ["numbani"] = new MapRecommendation
        {
            MapId = "numbani",
            Tanks = new() { "winston", "dva", "sigma" },
            Damages = new() { "widowmaker", "tracer", "genji", "pharah" },
            Supports = new() { "ana", "mercy", "kiriko" },
            Notes = "高机动地图"
        },
        ["kings_row"] = new MapRecommendation
        {
            MapId = "kings_row",
            Tanks = new() { "reinhardt", "zarya", "sigma" },
            Damages = new() { "reaper", "mei", "cassidy", "hanzo" },
            Supports = new() { "ana", "lucio", "moira" },
            Notes = "狭窄街道，近战强势"
        },
        ["hollywood"] = new MapRecommendation
        {
            MapId = "hollywood",
            Tanks = new() { "reinhardt", "sigma", "dva" },
            Damages = new() { "hanzo", "widowmaker", "cassidy", "tracer" },
            Supports = new() { "ana", "baptiste", "kiriko" },
            Notes = "第一点开阔"
        },
        ["blizzard_world"] = new MapRecommendation
        {
            MapId = "blizzard_world",
            Tanks = new() { "reinhardt", "sigma", "dva" },
            Damages = new() { "hanzo", "pharah", "tracer", "junkrat" },
            Supports = new() { "ana", "lucio", "kiriko" },
            Notes = "地形多变"
        },
        ["eichenwalde"] = new MapRecommendation
        {
            MapId = "eichenwalde",
            Tanks = new() { "reinhardt", "sigma", "zarya" },
            Damages = new() { "hanzo", "junkrat", "reaper", "mei" },
            Supports = new() { "ana", "lucio", "moira" },
            Notes = "城堡内近战强势"
        },
        ["paraiso"] = new MapRecommendation
        {
            MapId = "paraiso",
            Tanks = new() { "winston", "dva", "sigma" },
            Damages = new() { "tracer", "genji", "pharah", "widowmaker" },
            Supports = new() { "lucio", "kiriko", "ana" },
            Notes = "高机动地图"
        },
    };

    public static MapRecommendation? GetPreset(string mapId)
    {
        return Presets.TryGetValue(mapId, out var preset) ? preset : null;
    }
}

public class MapRecommendation
{
    public string MapId { get; set; } = "";
    public List<string> Tanks { get; set; } = new();
    public List<string> Damages { get; set; } = new();
    public List<string> Supports { get; set; } = new();
    public string Notes { get; set; } = "";
}
