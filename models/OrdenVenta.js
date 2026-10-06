// models/OrdenVenta.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const OrdenVenta = sequelize.define('OrdenVenta', {
    NroOrdenVta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaEmision: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    Motivo: { type: DataTypes.STRING },
    Situacion: {
        type: DataTypes.ENUM('pendiente', 'completada', 'cancelada'),
        defaultValue: 'pendiente'
    }
}, {
    tableName: 'ordenes_venta',
    timestamps: true
});

module.exports = OrdenVenta;