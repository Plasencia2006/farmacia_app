// models/TipoMedic.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TipoMedic = sequelize.define('TipoMedic', {
    CodTipoMed: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: 'tipo_medicamentos',
    timestamps: true
});

module.exports = TipoMedic;