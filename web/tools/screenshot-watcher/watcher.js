#!/usr/bin/env node
/**
 * Minimal SSE screenshot watcher (Windows friendly)
 * - Watches a directory for new image files
 * - Serves Server-Sent Events on /stream
 * - On new file, sends an event `screenshot` with base64 payload
 * Usage:
 *   node tools/screenshot-watcher/watcher.js --dir "C:\\Users\\<you>\\Pictures" --port 8766 --ext ".png,.jpg,.jpeg,.webp"
 */
const http = require("http");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const argMap = {};
for (let i = 0; i < args.length; i += 2) {
  const k = args[i];
  const v = args[i + 1];
  if (k && v) argMap[k.replace(/^--/, "")] = v;
}

const WATCH_DIR =
  argMap.dir ||
  process.env.WATCH_DIR ||
  process.env.USERPROFILE ||
  process.cwd();
const PORT = parseInt(argMap.port || process.env.PORT || "8766", 10);
const exts = (argMap.ext || process.env.EXTS || ".png,.jpg,.jpeg,.webp,.bmp")
  .toLowerCase()
  .split(",");

const clients = new Set();

function sendEvent(res, event, dataObj) {
  try {
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(dataObj)}\n\n`);
  } catch (e) {
    // client likely disconnected
  }
}

const server = http.createServer((req, res) => {
  if (req.url === "/stream") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    });
    res.write("\n");

    clients.add(res);
    sendEvent(res, "ready", { dir: WATCH_DIR });

    req.on("close", () => {
      clients.delete(res);
    });
  } else if (req.url === "/health") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(JSON.stringify({ ok: true, dir: WATCH_DIR }));
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("screenshot-watcher running");
  }
});

server.listen(PORT, () => {
  console.log(
    `[watcher] SSE server listening on http://localhost:${PORT}/stream`
  );
  console.log(`[watcher] Watching directory: ${WATCH_DIR}`);
});

// Debounce map to avoid duplicate triggers during file writes
const pending = new Map();

function isImageFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return exts.includes(ext);
}

function emitFile(filePath) {
  fs.readFile(filePath, (err, buf) => {
    if (err) return;
    const ext = path.extname(filePath).toLowerCase();
    const name = path.basename(filePath);
    const mime =
      ext === ".png"
        ? "image/png"
        : ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : ext === ".webp"
        ? "image/webp"
        : ext === ".bmp"
        ? "image/bmp"
        : "application/octet-stream";
    const b64 = buf.toString("base64");
    const payload = { path: filePath, name, mime, data: b64, ts: Date.now() };
    for (const res of clients) sendEvent(res, "screenshot", payload);
    console.log(`[watcher] sent ${name} to ${clients.size} client(s)`);
  });
}

function handleFsEvent(eventType, filename) {
  if (!filename) return;
  const full = path.join(WATCH_DIR, filename);
  if (!isImageFile(full)) return;

  // Wait a bit to ensure file is fully written
  clearTimeout(pending.get(full));
  const t = setTimeout(() => {
    fs.stat(full, (err, st) => {
      if (err || !st || !st.isFile()) return;
      emitFile(full);
    });
    pending.delete(full);
  }, 500);
  pending.set(full, t);
}

try {
  fs.watch(WATCH_DIR, { persistent: true }, (event, filename) => {
    handleFsEvent(event, filename);
  });
} catch (e) {
  console.error("[watcher] fs.watch error:", e);
}
