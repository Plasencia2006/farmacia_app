// models/index.js
const sequelize = require('../config/db');
const Usuario = require('./Usuario');
const Laboratorio = require('./Laboratorio');
const Especialidad = require('./Especialidad');
const TipoMedic = require('./TipoMedic');
const Medicamento = require('./Medicamento');
const OrdenCompra = require('./OrdenCompra');
const DetalleOrdenCompra = require('./DetalleOrdenCompra');
const OrdenVenta = require('./OrdenVenta');
const DetalleOrdenVta = require('./DetalleOrdenVta');

// ===== RELACIONES =====

// Laboratorio 1:N OrdenCompra
Laboratorio.hasMany(OrdenCompra, { foreignKey: 'CodLab', as: 'ordenesCompra' });
OrdenCompra.belongsTo(Laboratorio, { foreignKey: 'CodLab', as: 'laboratorio' });

// OrdenCompra 1:N DetalleOrdenCompra
OrdenCompra.hasMany(DetalleOrdenCompra, { foreignKey: 'NroOrdenC', as: 'detalles' });
DetalleOrdenCompra.belongsTo(OrdenCompra, { foreignKey: 'NroOrdenC', as: 'orden' });

// Medicamento 1:N DetalleOrdenCompra
Medicamento.hasMany(DetalleOrdenCompra, { foreignKey: 'CodMedicamento', as: 'detallesCompra' });
DetalleOrdenCompra.belongsTo(Medicamento, { foreignKey: 'CodMedicamento', as: 'medicamento' });

// TipoMedic 1:N Medicamento
TipoMedic.hasMany(Medicamento, { foreignKey: 'CodTipoMed', as: 'medicamentos' });
Medicamento.belongsTo(TipoMedic, { foreignKey: 'CodTipoMed', as: 'tipoMedicamento' });

// Especialidad 1:N Medicamento
Especialidad.hasMany(Medicamento, { foreignKey: 'CodEspec', as: 'medicamentos' });
Medicamento.belongsTo(Especialidad, { foreignKey: 'CodEspec', as: 'especialidad' });

// Medicamento 1:N DetalleOrdenVta
Medicamento.hasMany(DetalleOrdenVta, { foreignKey: 'CodMedicamento', as: 'detallesVenta' });
DetalleOrdenVta.belongsTo(Medicamento, { foreignKey: 'CodMedicamento', as: 'medicamento' });

// OrdenVenta 1:N DetalleOrdenVta
OrdenVenta.hasMany(DetalleOrdenVta, { foreignKey: 'NroOrdenVta', as: 'detalles' });
DetalleOrdenVta.belongsTo(OrdenVenta, { foreignKey: 'NroOrdenVta', as: 'orden' });

// Exportar todos los modelos
module.exports = {
    sequelize,
    Usuario,
    Laboratorio,
    Especialidad,
    TipoMedic,
    Medicamento,
    OrdenCompra,
    DetalleOrdenCompra,
    OrdenVenta,
    DetalleOrdenVta
};