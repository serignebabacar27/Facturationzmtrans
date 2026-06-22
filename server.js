import http from "node:http";
import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "127.0.0.1";

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png"
};

const server = http.createServer((req, res) => {
  const requestedPath = decodeURIComponent(new URL(req.url, `http://localhost:${port}`).pathname);
  const safePath = path.normalize(requestedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(__dirname, safePath === "/" ? "index.html" : safePath);
  const finalPath = existsSync(filePath) ? filePath : path.join(__dirname, "index.html");
  const ext = path.extname(finalPath);

  res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
  createReadStream(finalPath).pipe(res);
});

server.listen(port, host, () => {
  console.log(`Frontend ZMTRANS: http://${host}:${port}`);
});
