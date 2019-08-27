import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import { generateDal } from './shared/dal';
import { db } from '@models';

generateDal(db);

import { connectionDatabase } from './database/index';
import { stream } from '@utils';
import { router as routes } from '@features/index';
import { errorHandler, requestValidate } from '@middlewares';
import { swagger } from './shared/utils/swagger';

connectionDatabase();

const app = express();

app
  .use(helmet())
  .use(cors())
  .use(morgan('combined', { stream }))
  .use(swagger())
  .use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
  .use(bodyParser.json({ limit: '50mb' }))
  .use(requestValidate)
  .use(routes)
  .use(errorHandler);

export { app };
