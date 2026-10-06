// models/DetalleOrdenVta.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DetalleOrdenVta = sequelize.define('DetalleOrdenVta', {
    NroOrdenVta: { type: DataTypes.INTEGER, allowNull: false },
    CodMedicamento: { type: DataTypes.INTEGER, allowNull: false },
    descripcionMed: { type: DataTypes.STRING },
    cantidadRequerida: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
    tableName: 'detalles_orden_venta',
    timestamps: true
});

module.exports = DetalleOrdenVta;