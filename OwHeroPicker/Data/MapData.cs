using OwHeroPicker.Models;

namespace OwHeroPicker.Data;

public static class MapData
{
    public static List<GameMap> Maps { get; } = new()
    {
        // ===== 抢点图 (7) =====
        new GameMap { Id = "ilios", Name = "伊里奥斯", Type = MapType.Control, SubMaps = new() {
            new SubMap { Id = "ilios_lighthouse", Name = "伊里奥斯灯塔" },
            new SubMap { Id = "ilios_well", Name = "伊里奥斯深井" },
            new SubMap { Id = "ilios_ruins", Name = "伊里奥斯废墟" },
        }},
        new GameMap { Id = "lijiang", Name = "漓江塔", Type = MapType.Control, SubMaps = new() {
            new SubMap { Id = "lijiang_market", Name = "漓江塔夜市" },
            new SubMap { Id = "lijiang_control", Name = "漓江塔控制中心" },
            new SubMap { Id = "lijiang_garden", Name = "漓江塔庭院" },
        }},
        new GameMap { Id = "antarctic", Name = "南极冰岛", Type = MapType.Control, SubMaps = new() {
            new SubMap { Id = "antarctic_icebreaker", Name = "南极冰岛破冰船" },
            new SubMap { Id = "antarctic_labs", Name = "南极冰岛实验区" },
            new SubMap { Id = "antarctic_sublevel", Name = "南极冰岛冰下层" },
        }},
        new GameMap { Id = "nepal", Name = "尼泊尔", Type = MapType.Control, SubMaps = new() {
            new SubMap { Id = "nepal_sanctum", Name = "尼泊尔圣所" },
            new SubMap { Id = "nepal_shrine", Name = "尼泊尔圣坛" },
            new SubMap { Id = "nepal_village", Name = "尼泊尔村庄" },
        }},
        new GameMap { Id = "oasis", Name = "绿洲城", Type = MapType.Control, SubMaps = new() {
            new SubMap { Id = "oasis_center", Name = "绿洲城中心" },
            new SubMap { Id = "oasis_gardens", Name = "绿洲城花园" },
            new SubMap { Id = "oasis_university", Name = "绿洲城大学" },
        }},
        new GameMap { Id = "samoa", Name = "萨摩亚", Type = MapType.Control, SubMaps = new() {
            new SubMap { Id = "samoa_volcano", Name = "萨摩亚火山" },
            new SubMap { Id = "samoa_downtown", Name = "萨摩亚城区" },
            new SubMap { Id = "samoa_beach", Name = "萨摩亚海滩" },
        }},
        new GameMap { Id = "busan", Name = "釜山", Type = MapType.Control, SubMaps = new() {
            new SubMap { Id = "busan_downtown", Name = "釜山城区" },
            new SubMap { Id = "busan_sanctuary", Name = "釜山寺院" },
            new SubMap { Id = "busan_meka", Name = "釜山MEKA基地" },
        }},

        // ===== 机动推进图 (4) =====
        new GameMap { Id = "esperanca", Name = "埃斯佩兰萨", Type = MapType.Push },
        new GameMap { Id = "colosseo", Name = "斗兽场", Type = MapType.Push },
        new GameMap { Id = "new_queen_street", Name = "新皇后街", Type = MapType.Push },
        new GameMap { Id = "runasapi", Name = "鲁纳塞彼", Type = MapType.Push },

        // ===== 闪点图 (3) =====
        new GameMap { Id = "new_junk_city", Name = "新渣克城", Type = MapType.Flashpoint },
        new GameMap { Id = "suravasa", Name = "苏拉瓦萨", Type = MapType.Flashpoint },
        new GameMap { Id = "throne", Name = "阿特利斯", Type = MapType.Flashpoint },

        // ===== 纯推车图 (8) =====
        new GameMap { Id = "route66", Name = "66公路", Type = MapType.Escort, SubMaps = new() {
            new SubMap { Id = "route66_a", Name = "66公路A段" },
            new SubMap { Id = "route66_b", Name = "66公路B段" },
            new SubMap { Id = "route66_c", Name = "66公路C段" },
        }},
        new GameMap { Id = "havana", Name = "哈瓦那", Type = MapType.Escort, SubMaps = new() {
            new SubMap { Id = "havana_a", Name = "哈瓦那A段" },
            new SubMap { Id = "havana_b", Name = "哈瓦那B段" },
            new SubMap { Id = "havana_c", Name = "哈瓦那C段" },
        }},
        new GameMap { Id = "dorado", Name = "多拉多", Type = MapType.Escort, SubMaps = new() {
            new SubMap { Id = "dorado_a", Name = "多拉多A段" },
            new SubMap { Id = "dorado_b", Name = "多拉多B段" },
            new SubMap { Id = "dorado_c", Name = "多拉多C段" },
        }},
        new GameMap { Id = "junkertown", Name = "渣克镇", Type = MapType.Escort, SubMaps = new() {
            new SubMap { Id = "junkertown_a", Name = "渣克镇A段" },
            new SubMap { Id = "junkertown_b", Name = "渣克镇B段" },
            new SubMap { Id = "junkertown_c", Name = "渣克镇C段" },
        }},
        new GameMap { Id = "circuit_royal", Name = "皇家赛道", Type = MapType.Escort, SubMaps = new() {
            new SubMap { Id = "circuit_royal_a", Name = "皇家赛道A段" },
            new SubMap { Id = "circuit_royal_b", Name = "皇家赛道B段" },
            new SubMap { Id = "circuit_royal_c", Name = "皇家赛道C段" },
        }},
        new GameMap { Id = "watchpoint_gibraltar", Name = "直布罗陀", Type = MapType.Escort, SubMaps = new() {
            new SubMap { Id = "watchpoint_gibraltar_a", Name = "直布罗陀A段" },
            new SubMap { Id = "watchpoint_gibraltar_b", Name = "直布罗陀B段" },
            new SubMap { Id = "watchpoint_gibraltar_c", Name = "直布罗陀C段" },
        }},
        new GameMap { Id = "rialto", Name = "里阿尔托", Type = MapType.Escort, SubMaps = new() {
            new SubMap { Id = "rialto_a", Name = "里阿尔托A段" },
            new SubMap { Id = "rialto_b", Name = "里阿尔托B段" },
            new SubMap { Id = "rialto_c", Name = "里阿尔托C段" },
        }},
        new GameMap { Id = "shambali", Name = "乡巴里寺院", Type = MapType.Escort, SubMaps = new() {
            new SubMap { Id = "shambali_a", Name = "乡巴里寺院A段" },
            new SubMap { Id = "shambali_b", Name = "乡巴里寺院B段" },
            new SubMap { Id = "shambali_c", Name = "乡巴里寺院C段" },
        }},

        // ===== 混合推车图 (7) =====
        new GameMap { Id = "midtown", Name = "中城", Type = MapType.Hybrid, SubMaps = new() {
            new SubMap { Id = "midtown_a", Name = "中城A点" },
            new SubMap { Id = "midtown_b", Name = "中城B段" },
            new SubMap { Id = "midtown_c", Name = "中城C段" },
        }},
        new GameMap { Id = "numbani", Name = "努巴尼", Type = MapType.Hybrid, SubMaps = new() {
            new SubMap { Id = "numbani_a", Name = "努巴尼A点" },
            new SubMap { Id = "numbani_b", Name = "努巴尼B段" },
            new SubMap { Id = "numbani_c", Name = "努巴尼C段" },
        }},
        new GameMap { Id = "kings_row", Name = "国王大道", Type = MapType.Hybrid, SubMaps = new() {
            new SubMap { Id = "kings_row_a", Name = "国王大道A点" },
            new SubMap { Id = "kings_row_b", Name = "国王大道B段" },
            new SubMap { Id = "kings_row_c", Name = "国王大道C段" },
        }},
        new GameMap { Id = "hollywood", Name = "好莱坞", Type = MapType.Hybrid, SubMaps = new() {
            new SubMap { Id = "hollywood_a", Name = "好莱坞A点" },
            new SubMap { Id = "hollywood_b", Name = "好莱坞B段" },
            new SubMap { Id = "hollywood_c", Name = "好莱坞C段" },
        }},
        new GameMap { Id = "blizzard_world", Name = "暴雪世界", Type = MapType.Hybrid, SubMaps = new() {
            new SubMap { Id = "blizzard_world_a", Name = "暴雪世界A点" },
            new SubMap { Id = "blizzard_world_b", Name = "暴雪世界B段" },
            new SubMap { Id = "blizzard_world_c", Name = "暴雪世界C段" },
        }},
        new GameMap { Id = "eichenwalde", Name = "艾兴瓦尔德", Type = MapType.Hybrid, SubMaps = new() {
            new SubMap { Id = "eichenwalde_a", Name = "艾兴瓦尔德A点" },
            new SubMap { Id = "eichenwalde_b", Name = "艾兴瓦尔德B段" },
            new SubMap { Id = "eichenwalde_c", Name = "艾兴瓦尔德C段" },
        }},
        new GameMap { Id = "paraiso", Name = "帕拉伊苏", Type = MapType.Hybrid, SubMaps = new() {
            new SubMap { Id = "paraiso_a", Name = "帕拉伊苏A点" },
            new SubMap { Id = "paraiso_b", Name = "帕拉伊苏B段" },
            new SubMap { Id = "paraiso_c", Name = "帕拉伊苏C段" },
        }},
    };

    public static GameMap? GetMapById(string id) => Maps.FirstOrDefault(m => m.Id == id);

    public static List<GameMap> GetMapsByType(MapType type) => Maps.Where(m => m.Type == type).ToList();

    public static List<GameMap> ControlMaps => GetMapsByType(MapType.Control);
    public static List<GameMap> PushMaps => GetMapsByType(MapType.Push);
    public static List<GameMap> FlashpointMaps => GetMapsByType(MapType.Flashpoint);
    public static List<GameMap> EscortMaps => GetMapsByType(MapType.Escort);
    public static List<GameMap> HybridMaps => GetMapsByType(MapType.Hybrid);
}
