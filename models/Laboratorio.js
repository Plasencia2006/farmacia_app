// models/Laboratorio.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Laboratorio = sequelize.define('Laboratorio', {
    CodLab: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    razonSocial: { type: DataTypes.STRING, allowNull: false },
    direccion: { type: DataTypes.STRING },
    telefono: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    contacto: { type: DataTypes.STRING }
}, {
    tableName: 'laboratorios',
    timestamps: true
});

module.exports = Laboratorio;