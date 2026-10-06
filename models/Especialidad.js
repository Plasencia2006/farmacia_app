// models/Especialidad.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Especialidad = sequelize.define('Especialidad', {
    CodEspec: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcionEsp: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: 'especialidades',
    timestamps: true
});

module.exports = Especialidad;