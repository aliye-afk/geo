const fs = require("fs");
const path = require("path");
const ROOT = "C:/Users/Administrator/Documents/Codex/2026-07-31/new-chat-2/geo-site";

function minify(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")  // remove comments
    .replace(/>\s+</g, "><")           // remove whitespace between tags  
    .replace(/\s{2,}/g, " ")           // collapse multiple spaces
    .replace(/;\s+/g, ";")             // CSS minify
    .replace(/:\s+/g, ":")
    .replace(/,\s+/g, ",")
    .replace(/\n/g, "");               // remove newlines
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let count = 0;
  for (const e of entries) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) {
      count += walk(fp);
    } else if (e.name.endsWith(".html")) {
      const orig = fs.readFileSync(fp, "utf-8");
      const min = minify(orig);
      if (min.length < orig.length * 0.95) {
        fs.writeFileSync(fp, min, "utf-8");
        count++;
      }
    }
  }
  return count;
}

const done = walk(ROOT);
console.log("Minified " + done + " HTML files");
