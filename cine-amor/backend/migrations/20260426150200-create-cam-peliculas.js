'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cam_peliculas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      titulo: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      anio: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rating: {
        type: Sequelize.DECIMAL(3, 1),
        allowNull: false,
        defaultValue: 0,
      },
      director: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      duracion_minutos: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      imagen: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      id_genero: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cam_generos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
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
    await queryInterface.dropTable('cam_peliculas');
  },
};
