
import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

import { app } from './app';
import config from '@config';
import { logger } from '@utils';

const port = config.port;
const server = http.createServer(app);

server.listen(port, () => {
  logger.info(`API server is listening on port ${port}`);
});
