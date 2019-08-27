import { Sequelize, DataTypes } from 'sequelize';

import config from '@config';
import movie from './movie';
import comment from './comment';

const { database, username, password, options } = config.database;

export const sequelize = new Sequelize(database, username, password, options);

const db = {
  sequelize,
  Sequelize,
  movie: movie(sequelize, DataTypes),
  comment: comment(sequelize, DataTypes),
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export { db };
