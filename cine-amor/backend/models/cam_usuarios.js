'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class cam_usuarios extends Model {}

  cam_usuarios.init({
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM('admin', 'cliente'),
      allowNull: false,
      defaultValue: 'cliente',
    },
    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'cam_usuarios',
    tableName: 'cam_usuarios',
    freezeTableName: true,
  });

  cam_usuarios.associate = (models) => {
    cam_usuarios.hasMany(models.cam_favoritos, {
      as: 'favoritos',
      foreignKey: 'id_usuario',
    });
  };

  return cam_usuarios;
};
