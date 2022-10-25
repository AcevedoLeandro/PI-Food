const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('diet', {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    },
        {
            timestamps: false
        });
};