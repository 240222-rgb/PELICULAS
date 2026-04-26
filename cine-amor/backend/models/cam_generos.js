'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class cam_generos extends Model {}

  cam_generos.init({
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'cam_generos',
    tableName: 'cam_generos',
    freezeTableName: true,
  });

  cam_generos.associate = (models) => {
    cam_generos.hasMany(models.cam_peliculas, {
      as: 'peliculas',
      foreignKey: 'id_genero',
    });
  };

  return cam_generos;
};
