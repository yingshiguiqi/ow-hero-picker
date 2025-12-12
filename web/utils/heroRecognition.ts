import { heroes, Hero } from "@/data/heroes";
import { maps } from "@/data/maps";

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

export function recognizeMapFromText(text: string): {
  mapId?: string;
  subMapId?: string;
} {
  // 归一化：去空白与常见别名（例如“南极半岛”→“南极冰岛”）
  const t = (text || "").replace(/\s+/g, "").replace(/南极半岛/g, "南极冰岛");
  let foundMapId: string | undefined;
  let foundSubId: string | undefined;
  for (const m of maps) {
    const mName = m.name.replace(/\s+/g, "");
    if (t.includes(mName)) {
      foundMapId = m.id;
    }
    if (m.subMaps) {
      for (const sm of m.subMaps) {
        const smName = sm.name.replace(/\s+/g, "");
        if (t.includes(smName)) {
          foundMapId = m.id;
          foundSubId = sm.id;
          break;
        }
        // 子图名关键字匹配：移除地图名前缀后匹配最后的关键词（如“实验区/破冰船/冰下层/夜市/花园/大学”等）
        const key = smName.replace(mName, "");
        if (key && key.length >= 2 && t.includes(key)) {
          foundMapId = m.id;
          foundSubId = sm.id;
          break;
        }
      }
    }
    if (foundSubId) break;
  }
  return { mapId: foundMapId, subMapId: foundSubId };
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
export async function recognizeHeroesFromImageDetailed(file: File): Promise<{
  heroes: Hero[];
  screenType: ScreenType;
  text: string;
  mapId?: string;
  subMapId?: string;
}> {
  try {
    const Tesseract = (await import("tesseract.js")).default;
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target?.result as string | undefined;
        if (!imageData)
          return resolve({ heroes: [], screenType: "unknown", text: "" });
        try {
          // 优先尝试：AI 识别（若前端已配置启用），不提前返回，后续再做融合
          const aiResult = await tryAIRecognize(imageData).catch(() => null);

          const result = await Tesseract.recognize(imageData, "chi_sim+eng", {
            logger: (info) => console.log(info),
          });
          const text = result.data.text || "";
          const heroesFound = recognizeHeroesFromText(text);
          const screenType = detectScreenTypeFromText(text);
          const { mapId, subMapId } = recognizeMapFromText(text);
          // 英雄融合策略：AI -> 模板匹配 -> OCR 文本
          let finalHeroes: Hero[] = [];
          if (aiResult?.heroes?.length) finalHeroes = aiResult.heroes;

          if (
            !finalHeroes ||
            finalHeroes.length === 0 ||
            finalHeroes.length > 30
          ) {
            try {
              const templ = await recognizeHeroesByTemplate(imageData);
              if (templ.length > 0) {
                finalHeroes = mergeHeroesUnique(finalHeroes, templ);
              }
            } catch (e) {
              console.warn("模板匹配失败", e);
            }
          }

          if (!finalHeroes || finalHeroes.length === 0) {
            finalHeroes = heroesFound;
          }

          resolve({
            heroes: finalHeroes,
            screenType: aiResult?.screenType || screenType,
            text: aiResult?.text || text,
            mapId: aiResult?.mapId || mapId,
            subMapId: aiResult?.subMapId || subMapId,
          });
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

async function tryAIRecognize(dataUrl: string): Promise<{
  heroes: Hero[];
  screenType: ScreenType;
  text: string;
  mapId?: string;
  subMapId?: string;
} | null> {
  if (typeof window === "undefined") return null;
  try {
    const enabled = localStorage.getItem("ow-ai-enabled") === "1";
    const baseUrl = localStorage.getItem("ow-ai-baseurl") || "";
    const apiKey = localStorage.getItem("ow-ai-apikey") || "";
    const model = localStorage.getItem("ow-ai-model") || "gemini-2.5-pro";
    if (!enabled || !baseUrl || !apiKey) return null;

    const system =
      '你是守望先锋地图与英雄识别助手。请从图片识别中文地图/子图名和出现的英雄中文名，严格输出 JSON: {"mapName": string|null, "subMapName": string|null, "heroes": string[], "screenType": string|null }。';

    const body: any = {
      model,
      temperature: 0,
      messages: [
        { role: "system", content: system },
        {
          role: "user",
          content: [
            { type: "text", text: "识别图片，严格JSON" },
            { type: "image_url", image_url: { url: dataUrl } },
          ],
        },
      ],
      response_format: { type: "json_object" },
    };

    const res = await fetch(joinUrl(baseUrl, "/chat/completions"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(String(res.status));
    const json = await res.json();
    const content: string = json?.choices?.[0]?.message?.content || "";
    const parsed = safeParseJSON(content);
    if (!parsed) return null;

    const names: string[] = Array.isArray(parsed.heroes) ? parsed.heroes : [];
    const mapName: string = parsed.mapName || "";
    const subName: string = parsed.subMapName || "";
    const screen: string = (parsed.screenType || "unknown")
      .toString()
      .toLowerCase();

    const { mapId, subMapId } = recognizeMapFromText(`${mapName}${subName}`);
    const mappedHeroes = mapNamesToHeroes(names);
    const st: ScreenType =
      screen === "select" ||
      screen === "ban" ||
      screen === "vs" ||
      screen === "lobby"
        ? (screen as ScreenType)
        : "unknown";

    return {
      heroes: mappedHeroes,
      screenType: st,
      text: content,
      mapId,
      subMapId,
    };
  } catch {
    return null;
  }
}

function mapNamesToHeroes(names: string[]): Hero[] {
  if (!names || names.length === 0) return [];
  const norm = (s: string) => (s || "").toLowerCase().trim();
  const out: Hero[] = [];
  names.forEach((n) => {
    const t = norm(n);
    const h = heroes.find(
      (h) =>
        norm(h.name) === t ||
        norm(h.nameEn) === t ||
        (h.aliases || []).some((a) => norm(a) === t)
    );
    if (h) out.push(h);
  });
  const uniq = new Map<string, Hero>();
  out.forEach((h) => uniq.set(h.id, h));
  return Array.from(uniq.values());
}

function safeParseJSON(s: string): any | null {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}

function joinUrl(base: string, path: string) {
  if (!base) return path;
  return base.replace(/\/$/, "") + path;
}

// ================== OpenCV.js 模板匹配（头像识别） ==================
async function loadOpenCV(): Promise<any> {
  if (typeof window === "undefined") return null;
  const w = window as any;
  if (w.cv && w.cv.imread) return w.cv;
  await new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://docs.opencv.org/4.x/opencv.js";
    s.async = true;
    s.onload = () => {
      const tick = () => {
        if ((w as any).cv && (w as any).cv.imread) resolve();
        else setTimeout(tick, 50);
      };
      tick();
    };
    s.onerror = () => reject(new Error("opencv load failed"));
    document.head.appendChild(s);
  });
  return (window as any).cv;
}

function loadImageToCanvas(src: string): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext("2d");
      if (!ctx) {
        reject(new Error("no ctx"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      resolve(c);
    };
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

async function recognizeHeroesByTemplate(dataUrl: string): Promise<Hero[]> {
  const cv = await loadOpenCV();
  if (!cv) return [];

  // 读入主图
  const mainCanvas = await loadImageToCanvas(dataUrl);
  const src = cv.imread(mainCanvas);
  const gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

  const results = new Set<string>();
  const base =
    (typeof process !== "undefined" &&
      (process as any).env?.NEXT_PUBLIC_BASE_PATH) ||
    "";
  const candidates = heroes.filter((h) => !!h.avatar);

  for (const h of candidates) {
    try {
      const tempCanvas = await loadImageToCanvas(`${base}${h.avatar}`);
      const templ = cv.imread(tempCanvas);
      const templGray = new cv.Mat();
      cv.cvtColor(templ, templGray, cv.COLOR_RGBA2GRAY);

      const scales = [0.8, 0.9, 1.0, 1.1];
      let matched = false;
      for (const s of scales) {
        const tw = Math.max(8, Math.round(templGray.cols * s));
        const th = Math.max(8, Math.round(templGray.rows * s));
        const resized = new cv.Mat();
        cv.resize(templGray, resized, new cv.Size(tw, th));
        const result = new cv.Mat();
        cv.matchTemplate(gray, resized, result, cv.TM_CCOEFF_NORMED);
        const { maxVal } = cv.minMaxLoc(result);
        result.delete();
        resized.delete();
        if (maxVal >= 0.76) {
          matched = true;
          break;
        }
      }

      templ.delete();
      templGray.delete();
      if (matched) results.add(h.id);
    } catch {}
  }

  src.delete();
  gray.delete();
  return heroes.filter((h) => results.has(h.id));
}

function mergeHeroesUnique(a: Hero[] = [], b: Hero[] = []): Hero[] {
  const map = new Map<string, Hero>();
  [...a, ...b].forEach((h) => map.set(h.id, h));
  return Array.from(map.values());
}
