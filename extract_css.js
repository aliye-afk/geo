const fs = require("fs");
const path = require("path");
const ROOT = "C:/Users/Administrator/Documents/Codex/2026-07-31/new-chat-2/geo-site";

// Create external CSS
const css = `*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif;background:#f5f7fa;color:#333;line-height:1.8}.nav{background:#1a1a2e;color:#fff;padding:12px 20px;display:flex;align-items:center;gap:20px;flex-wrap:wrap}.nav a{color:#aab;text-decoration:none;font-size:14px}.nav a:hover{color:#fff}.nav .brand{font-size:16px;font-weight:700;color:#fff}.container{max-width:860px;margin:0 auto;padding:24px 16px}article{background:#fff;border-radius:12px;padding:32px;box-shadow:0 2px 12px rgba(0,0,0,0.06)}h1{font-size:24px;margin-bottom:16px;color:#1a1a2e}.meta{color:#999;font-size:13px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid #eee}.content{font-size:16px}.content p{margin-bottom:12px}.cta{background:linear-gradient(135deg,#1890ff,#096dd9);color:#fff;text-align:center;padding:24px;border-radius:10px;margin-top:32px}.cta h3{margin-bottom:8px}.cta p{margin-bottom:12px;opacity:0.9}.cta .tel{font-size:28px;font-weight:700}footer{text-align:center;padding:24px;color:#999;font-size:13px;border-top:1px solid #e8e8e8;margin-top:32px}footer a{color:#1890ff;text-decoration:none}.related{margin-top:32px}.related h3{font-size:18px;margin-bottom:12px}.related a{display:block;padding:8px 0;color:#1890ff;text-decoration:none;border-bottom:1px solid #f0f0f0}.breadcrumb{margin-bottom:12px;font-size:13px;color:#999}.breadcrumb a{color:#1890ff;text-decoration:none}`;

fs.writeFileSync(path.join(ROOT, "style.css"), css);

// Also create cat-style.css for category pages
const catCss = `*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif;background:#f5f7fa;color:#333;line-height:1.8}.nav{background:#1a1a2e;color:#fff;padding:12px 20px;display:flex;align-items:center;gap:20px;flex-wrap:wrap}.nav a{color:#aab;text-decoration:none;font-size:14px}.nav a:hover{color:#fff}.nav .brand{font-size:16px;font-weight:700;color:#fff}.container{max-width:960px;margin:0 auto;padding:24px 16px}h1{font-size:28px;margin-bottom:8px}.subtitle{color:#666;margin-bottom:24px;font-size:14px}.list{background:#fff;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.06)}.item{display:block;padding:16px 24px;border-bottom:1px solid #f0f0f0;text-decoration:none;color:#333;transition:background .2s}.item:hover{background:#f5f8ff}.item:last-child{border-bottom:none}.item .q{font-size:16px;font-weight:500;color:#1a1a2e}.item .a{font-size:14px;color:#666;margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.pager{text-align:center;margin-top:24px}.pager a,.pager span{display:inline-block;padding:8px 16px;margin:0 4px;border-radius:6px;text-decoration:none;font-size:14px}.pager a{background:#fff;color:#1890ff;border:1px solid #d9d9d9}.pager a:hover{border-color:#1890ff}.pager .cur{background:#1890ff;color:#fff}footer{text-align:center;padding:24px;color:#999;font-size:13px;border-top:1px solid #e8e8e8;margin-top:32px}`;

fs.writeFileSync(path.join(ROOT, "cat.css"), catCss);

// Now remove inline styles from all question pages, replace with <link>
function stripInlineStyles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let count = 0;
  for (const e of entries) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) {
      count += stripInlineStyles(fp);
    } else if (e.name.endsWith(".html")) {
      let h = fs.readFileSync(fp, "utf-8");
      let changed = false;
      
      // Replace inline <style>...</style> with <link rel="stylesheet">
      if (h.includes("<style>") && h.includes("</style>")) {
        const isCategory = h.includes("subtitle") && h.includes("pager");
        const styleFile = isCategory ? "/cat.css" : "/style.css";
        h = h.replace(/<style>[\s\S]*?<\/style>/, '<link rel="stylesheet" href="' + styleFile + '">');
        changed = true;
      }
      
      if (changed) {
        fs.writeFileSync(fp, h, "utf-8");
        count++;
      }
    }
  }
  return count;
}

const done = stripInlineStyles(ROOT);
console.log("Stripped inline styles from " + done + " pages");
