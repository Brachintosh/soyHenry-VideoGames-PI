const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo:
  
  sequelize.define('videogame', {

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    releaseDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    rating: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    background_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    created_inDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: true,
    },

  });
};
