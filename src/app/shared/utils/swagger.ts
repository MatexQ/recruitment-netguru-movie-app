import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';
import config from '@config';

export const swagger = () => {
  const swaggerRoutes = Router();
  const swaggerDocument = require(config.swaggerPath);

  swaggerRoutes
    .use('/api-docs', swaggerUi.serve)
    .get('/api-docs', swaggerUi.setup(swaggerDocument));

  return swaggerRoutes;
};
