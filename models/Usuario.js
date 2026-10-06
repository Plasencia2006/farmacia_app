// models/Usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    rol: {
        type: DataTypes.ENUM('administrador', 'moderador', 'usuario'),
        defaultValue: 'usuario'
    }
}, { tableName: 'usuarios', timestamps: true });

// Hashear password antes de guardar
Usuario.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 8);
});

module.exports = Usuario;