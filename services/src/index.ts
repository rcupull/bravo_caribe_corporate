import { PORT } from './config';
import { logger } from './features/logger';
import { app } from './server';
import http from 'http';

const port = Number(PORT);

http.createServer(app).listen(port, () => {
  logger.info(`Backend  server is running on port ${port}`);
});
