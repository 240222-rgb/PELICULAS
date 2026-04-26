'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class cam_favoritos extends Model {}

  cam_favoritos.init({
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: 'Mi lista',
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'cam_favoritos',
    tableName: 'cam_favoritos',
    freezeTableName: true,
  });

  cam_favoritos.associate = (models) => {
    cam_favoritos.belongsTo(models.cam_usuarios, {
      as: 'usuario',
      foreignKey: 'id_usuario',
    });

    cam_favoritos.hasMany(models.cad_favorito_detalle, {
      as: 'detalles',
      foreignKey: 'id_favorito',
    });
  };

  return cam_favoritos;
};
