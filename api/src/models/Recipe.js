const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 100
      }
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    dishTypes: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    }
  },
    {
      timestamps: false
    });
};
