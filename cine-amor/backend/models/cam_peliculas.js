'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class cam_peliculas extends Model {}

  cam_peliculas.init({
    titulo: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: false,
      defaultValue: 0,
    },
    director: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    duracion_minutos: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    imagen: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    id_genero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'cam_peliculas',
    tableName: 'cam_peliculas',
    freezeTableName: true,
  });

  cam_peliculas.associate = (models) => {
    cam_peliculas.belongsTo(models.cam_generos, {
      as: 'genero',
      foreignKey: 'id_genero',
    });

    cam_peliculas.hasMany(models.cad_favorito_detalle, {
      as: 'detalles_favorito',
      foreignKey: 'id_pelicula',
    });
  };

  return cam_peliculas;
};
