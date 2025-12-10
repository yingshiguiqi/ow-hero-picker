import { heroes, Hero } from "@/data/heroes";

export type ScreenType = "select" | "ban" | "vs" | "lobby" | "unknown";

function detectScreenTypeFromText(text: string): ScreenType {
  const t = text.toLowerCase();
  // 关键字基于中文UI；加入英文兜底
  if (t.includes("禁用英雄") || t.includes("ban")) return "ban";
  if (
    t.includes("集结你的队伍") ||
    t.includes("select hero") ||
    t.includes("选择英雄")
  )
    return "select";
  if (t.includes("vs") || t.includes("对阵")) return "vs";
  if (t.includes("守望先锋") || t.includes("游戏")) return "lobby";
  return "unknown";
}

// 文本识别英雄
export function recognizeHeroesFromText(text: string): Hero[] {
  const recognizedHeroes: Hero[] = [];
  const normalizedText = text.toLowerCase();

  heroes.forEach((hero) => {
    // 检查英雄名称
    if (normalizedText.includes(hero.name.toLowerCase())) {
      recognizedHeroes.push(hero);
      return;
    }

    // 检查英文名
    if (normalizedText.includes(hero.nameEn.toLowerCase())) {
      recognizedHeroes.push(hero);
      return;
    }

    // 检查别名
    if (hero.aliases) {
      for (const alias of hero.aliases) {
        if (normalizedText.includes(alias.toLowerCase())) {
          recognizedHeroes.push(hero);
          break;
        }
      }
    }
  });

  // 去重
  return Array.from(new Set(recognizedHeroes));
}

// 从图片识别英雄（使用OCR）
export async function recognizeHeroesFromImageDetailed(
  file: File
): Promise<{ heroes: Hero[]; screenType: ScreenType; text: string }> {
  try {
    const Tesseract = (await import("tesseract.js")).default;
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target?.result as string | undefined;
        if (!imageData)
          return resolve({ heroes: [], screenType: "unknown", text: "" });
        try {
          const result = await Tesseract.recognize(imageData, "chi_sim+eng", {
            logger: (info) => console.log(info),
          });
          const text = result.data.text || "";
          const heroesFound = recognizeHeroesFromText(text);
          const screenType = detectScreenTypeFromText(text);
          resolve({ heroes: heroesFound, screenType, text });
        } catch (error) {
          console.error("OCR识别失败:", error);
          resolve({ heroes: [], screenType: "unknown", text: "" });
        }
      };
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error("Tesseract.js 加载失败:", error);
    return { heroes: [], screenType: "unknown", text: "" };
  }
}

// 兼容旧API：仅返回识别到的英雄
export async function recognizeHeroesFromImage(file: File): Promise<Hero[]> {
  const { heroes } = await recognizeHeroesFromImageDetailed(file);
  return heroes;
}

// 导出配置为JSON
export function exportConfiguration(data: any): string {
  return JSON.stringify(data, null, 2);
}

// 下载文件
export function downloadFile(content: string, filename: string) {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
