const fs = require("fs");
const data = JSON.parse(fs.readFileSync("预设配置-preset.json", "utf8"));

const configs = {};
data.configurations.forEach((c) => {
  const key = c.subMapId ? `${c.mapId}::${c.subMapId}` : c.mapId;
  const good = [],
    average = [],
    bad = [];
  c.heroRatings.forEach((r) => {
    if (r.rating === "不错哦") good.push(r.heroId);
    else if (r.rating === "一般般") average.push(r.heroId);
    else if (r.rating === "不好用") bad.push(r.heroId);
  });
  if (good.length > 0 || average.length > 0 || bad.length > 0) {
    configs[key] = { good, average, bad };
  }
});

// 输出为 TypeScript 格式
let output = `import { Preset, MapConfiguration, HeroRatingData } from "@/store/useStore";
import { maps } from "@/data/maps";
import { HeroRating } from "@/data/heroes";

const SPECIFIC_CONFIGS: Record<string, { good: string[]; average: string[]; bad: string[] }> = {
`;

Object.entries(configs).forEach(([key, val]) => {
  output += `  "${key}": {\n`;
  output += `    good: [${val.good.map((h) => `"${h}"`).join(", ")}],\n`;
  output += `    average: [${val.average.map((h) => `"${h}"`).join(", ")}],\n`;
  output += `    bad: [${val.bad.map((h) => `"${h}"`).join(", ")}],\n`;
  output += `  },\n`;
});

output += `};

const UNIVERSAL_GOOD_IDS = ["reinhardt", "zarya", "mei", "sojourn", "tracer", "ana", "kiriko", "lucio"];

function buildRatings(good: string[], average: string[], bad: string[]): HeroRatingData[] {
  const ratings: HeroRatingData[] = [];
  good.forEach((id) => ratings.push({ heroId: id, rating: HeroRating.GOOD }));
  average.forEach((id) => ratings.push({ heroId: id, rating: HeroRating.AVERAGE }));
  bad.forEach((id) => ratings.push({ heroId: id, rating: HeroRating.BAD }));
  return ratings;
}

function buildConfigForAllMaps(): MapConfiguration[] {
  const defaultRatings = UNIVERSAL_GOOD_IDS.map((id) => ({ heroId: id, rating: HeroRating.GOOD }));
  const cfgs: MapConfiguration[] = [];

  for (const m of maps) {
    if (m.subMaps && m.subMaps.length > 0) {
      for (const sm of m.subMaps) {
        const key = \`\${m.id}::\${sm.id}\`;
        const specific = SPECIFIC_CONFIGS[key];
        if (specific) {
          cfgs.push({
            mapId: m.id,
            subMapId: sm.id,
            heroRatings: buildRatings(specific.good, specific.average, specific.bad),
          });
        } else {
          cfgs.push({ mapId: m.id, subMapId: sm.id, heroRatings: defaultRatings });
        }
      }
    } else {
      const key = m.id;
      const specific = SPECIFIC_CONFIGS[key];
      if (specific) {
        cfgs.push({ mapId: m.id, heroRatings: buildRatings(specific.good, specific.average, specific.bad) });
      } else {
        cfgs.push({ mapId: m.id, heroRatings: defaultRatings });
      }
    }
  }
  return cfgs;
}

export function createFactoryPreset(): Preset {
  const now = new Date();
  return {
    id: \`factory-\${now.getTime()}\`,
    name: "出厂预设 v2",
    configurations: buildConfigForAllMaps(),
    createdAt: now,
    updatedAt: now,
  };
}
`;

fs.writeFileSync("data/factoryPreset.ts", output);
console.log(
  "Generated",
  Object.keys(configs).length,
  "configs to data/factoryPreset.ts"
);
