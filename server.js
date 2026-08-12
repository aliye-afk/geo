const http = require("http");
const fs = require("fs");
const path = require("path");
const ROOT = "C:/Users/Administrator/Documents/Codex/2026-07-31/new-chat-2/geo-site";
const PORT = 3458;

const MIME = {".html":"text/html; charset=utf-8",".xml":"application/xml",".txt":"text/plain"};

http.createServer((req, res) => {
  let fp = path.join(ROOT, req.url === "/" ? "/index.html" : req.url);
  if (!path.extname(fp)) fp += ".html";
  
  try {
    const content = fs.readFileSync(fp);
    res.setHeader("Content-Type", MIME[path.extname(fp)] || "text/html; charset=utf-8");
    res.end(content);
  } catch(e) {
    res.statusCode = 404;
    res.end("Not Found");
  }
}).listen(PORT, () => console.log("GEO Site at http://localhost:" + PORT));
