import winston from 'winston';
import databaseConfig from './database';

const env = process.env.NODE_ENV || 'dev';

const config = {
  port: process.env.PORT || 9000,
  database: { ...databaseConfig[env], options: { ...databaseConfig.options } },
  logger: {
    level: process.env.LOGGER_LEVEL || 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: `${__dirname}/../../../error.log`, level: 'error' }),
      new winston.transports.File({ filename: `${__dirname}/../../../combined.log` }),
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
        ),
        level: 'silly',
      }),
    ],
  },
  omdbapi: {
    uri: 'http://www.omdbapi.com/?apikey=',
    apiKey: '380f1803',
    options: {
      json: true,
    },
  },
  swaggerPath: `${__dirname}/../../../swagger.json`,
};

export = config;
