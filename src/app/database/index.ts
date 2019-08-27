import { db } from '@models';
import { logger } from '@utils';

export const connectionDatabase = async () => {
  try {
    await db.sequelize.authenticate();
    logger.info('Connection has been established successfully');

  } catch (err) {
    logger.error('Database connection failed.');
  }
};
