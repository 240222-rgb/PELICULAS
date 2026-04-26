'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cad_favorito_detalle', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nota: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      id_favorito: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cam_favoritos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_pelicula: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cam_peliculas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('cad_favorito_detalle');
  },
};
