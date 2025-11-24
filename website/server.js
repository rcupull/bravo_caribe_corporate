/**
 * https://github.com/brillout/vite-plugin-server-entry
 */
import compression from 'compression';
import express from 'express';
import path from "path";
import sirv from 'sirv';
import { fileURLToPath } from "url";

const port = 5173;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.join(__dirname, "dist");


async function startServer() {
  const base = '/';
  const app = express();

  app.use(compression());
  app.use(base, sirv('./dist', { extensions: [] }));


  app.get("*", (req, res) => {
   res.sendFile(path.join(clientPath, "index.html"));
  });

  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}

startServer();
