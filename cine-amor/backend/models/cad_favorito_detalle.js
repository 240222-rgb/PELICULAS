'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class cad_favorito_detalle extends Model {}

  cad_favorito_detalle.init({
    nota: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    id_favorito: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_pelicula: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'cad_favorito_detalle',
    tableName: 'cad_favorito_detalle',
    freezeTableName: true,
  });

  cad_favorito_detalle.associate = (models) => {
    cad_favorito_detalle.belongsTo(models.cam_favoritos, {
      as: 'favorito',
      foreignKey: 'id_favorito',
    });

    cad_favorito_detalle.belongsTo(models.cam_peliculas, {
      as: 'pelicula',
      foreignKey: 'id_pelicula',
    });
  };

  return cad_favorito_detalle;
};
