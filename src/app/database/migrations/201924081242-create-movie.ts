'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('movies', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: true,
      },
      year: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      released: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      runtime: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      genre: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      director: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      writer: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      actors: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      plot: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      language: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      poster: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      metascore: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('movies');
  },
};
