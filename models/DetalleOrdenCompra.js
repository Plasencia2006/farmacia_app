// models/DetalleOrdenCompra.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DetalleOrdenCompra = sequelize.define('DetalleOrdenCompra', {
    NroOrdenC: { type: DataTypes.INTEGER, allowNull: false },
    CodMedicamento: { type: DataTypes.INTEGER, allowNull: false },
    descripcion: { type: DataTypes.STRING },
    cantidad: { type: DataTypes.INTEGER, defaultValue: 0 },
    precio: { type: DataTypes.FLOAT, defaultValue: 0 },
    montouni: { type: DataTypes.FLOAT, defaultValue: 0 }
}, {
    tableName: 'detalles_orden_compra',
    timestamps: true
});

module.exports = DetalleOrdenCompra;