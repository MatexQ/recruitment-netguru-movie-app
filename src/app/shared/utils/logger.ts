import winston, { Logger } from 'winston';
import config from '@config';

export const logger: Logger = winston.createLogger(config.logger);

export const stream = {
  write(message: string) {
    logger.info(message);
  },
};
