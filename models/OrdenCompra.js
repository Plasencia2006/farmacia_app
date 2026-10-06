// models/OrdenCompra.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const OrdenCompra = sequelize.define('OrdenCompra', {
    NroOrdenC: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaEmision: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    Situacion: {
        type: DataTypes.ENUM('pendiente', 'aprobada', 'cancelada', 'completada'),
        defaultValue: 'pendiente'
    },
    Total: { type: DataTypes.FLOAT, defaultValue: 0 },
    CodLab: { type: DataTypes.INTEGER, allowNull: true },
    NrofacturaProv: { type: DataTypes.STRING }
}, {
    tableName: 'ordenes_compra',
    timestamps: true,
    dialect: 'postgres'
});

module.exports = OrdenCompra;