// models/Medicamento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Medicamento = sequelize.define('Medicamento', {
    CodMedicamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcionMed: { type: DataTypes.STRING, allowNull: false },
    fechaFabricacion: { type: DataTypes.DATE },
    fechaVencimiento: { type: DataTypes.DATE },
    Presentacion: { type: DataTypes.STRING },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    precioVentaUni: { type: DataTypes.FLOAT, defaultValue: 0 },
    precioVentaPres: { type: DataTypes.FLOAT, defaultValue: 0 },
    Marca: { type: DataTypes.STRING },
    CodTipoMed: { type: DataTypes.INTEGER, allowNull: true },
    CodEspec: { type: DataTypes.INTEGER, allowNull: true }
}, {
    tableName: 'medicamentos',
    timestamps: true
});

module.exports = Medicamento;