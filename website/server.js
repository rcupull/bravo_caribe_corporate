/**
 * https://github.com/brillout/vite-plugin-server-entry
 */
import './dist/server/entry.mjs';
import compression from 'compression';
import express from 'express';
import sirv from 'sirv';
import { renderPage } from 'vike/server';

const port = 8080;
const base = '/';

async function startServer() {
  // Create an Express.js server
  const app = express();

  app.use(compression());
  app.use(base, sirv('./dist/client', { extensions: [] }));

  /**
   * some example from https://vike.dev/renderPage
   */
  app.get('*', async (req, res) => {
    const pageContextInit = {
      urlOriginal: req.originalUrl,

      headersOriginal: req.headers
    };

    /**
     * Example getted from https://github.com/vikejs/vike/blob/main/examples/react-streaming/server/index.js
     */
    const pageContext = await renderPage(pageContextInit);
    if (pageContext.errorWhileRendering) {
      /**
       * TODO:  Install error tracking here, see https://vike.dev/error-tracking
       */
    }
    const { httpResponse } = pageContext;
    httpResponse.headers.forEach(([name, value]) => res.setHeader(name, value));
    res.status(httpResponse.statusCode);
    httpResponse.pipe(res);
  });

  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}

startServer();
