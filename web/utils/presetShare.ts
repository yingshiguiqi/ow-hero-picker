import { Preset } from "@/store/useStore";

const PREFIX = "OW2P1"; // Overwatch2 Preset v1

function crc32(str: string): string {
  let crc = 0 ^ -1;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    crc = (crc >>> 8) ^ table[(crc ^ c) & 0xff];
  }
  return ((crc ^ -1) >>> 0).toString(16).toUpperCase();
}

// 预计算表
const table = (() => {
  const t: number[] = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    t[n] = c >>> 0;
  }
  return t;
})();

export function encodePreset(preset: Preset): string {
  const minimal = {
    name: preset.name,
    configurations: preset.configurations,
    v: 1,
  };
  const json = JSON.stringify(minimal);
  const b64 = btoa(unescape(encodeURIComponent(json)));
  const crc = crc32(json).slice(0, 8);
  return `${PREFIX}:${b64}:${crc}`;
}

export function decodePreset(code: string): {
  ok: boolean;
  data?: { name: string; configurations: Preset["configurations"]; v: number };
  error?: string;
} {
  try {
    if (!code.startsWith(PREFIX + ":"))
      return { ok: false, error: "前缀不匹配" };
    const parts = code.split(":");
    if (parts.length < 3) return { ok: false, error: "格式错误" };
    const b64 = parts[1];
    const crc = parts[2].toUpperCase();
    const json = decodeURIComponent(escape(atob(b64)));
    const actual = crc32(json).slice(0, 8).toUpperCase();
    if (actual !== crc) return { ok: false, error: "校验失败" };
    const parsed = JSON.parse(json);
    if (!parsed || parsed.v !== 1 || !parsed.configurations)
      return { ok: false, error: "版本不支持或数据不完整" };
    return { ok: true, data: parsed };
  } catch (e: any) {
    return { ok: false, error: e?.message || "解析失败" };
  }
}
