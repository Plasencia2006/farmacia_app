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

// Relaciones
Laboratorio.hasMany(OrdenCompra, { foreignKey: 'CodLab', as: 'ordenesCompra' });
OrdenCompra.belongsTo(Laboratorio, { foreignKey: 'CodLab', as: 'laboratorio' });

OrdenCompra.hasMany(DetalleOrdenCompra, { foreignKey: 'NroOrdenC', as: 'detalles' });
DetalleOrdenCompra.belongsTo(OrdenCompra, { foreignKey: 'NroOrdenC', as: 'orden' });

Medicamento.hasMany(DetalleOrdenCompra, { foreignKey: 'CodMedicamento', as: 'detallesCompra' });
DetalleOrdenCompra.belongsTo(Medicamento, { foreignKey: 'CodMedicamento', as: 'medicamento' });

TipoMedic.hasMany(Medicamento, { foreignKey: 'CodTipoMed', as: 'medicamentos' });
Medicamento.belongsTo(TipoMedic, { foreignKey: 'CodTipoMed', as: 'tipoMedicamento' });

Especialidad.hasMany(Medicamento, { foreignKey: 'CodEspec', as: 'medicamentos' });
Medicamento.belongsTo(Especialidad, { foreignKey: 'CodEspec', as: 'especialidad' });

Medicamento.hasMany(DetalleOrdenVta, { foreignKey: 'CodMedicamento', as: 'detallesVenta' });
DetalleOrdenVta.belongsTo(Medicamento, { foreignKey: 'CodMedicamento', as: 'medicamento' });

OrdenVenta.hasMany(DetalleOrdenVta, { foreignKey: 'NroOrdenVta', as: 'detalles' });
DetalleOrdenVta.belongsTo(OrdenVenta, { foreignKey: 'NroOrdenVta', as: 'orden' });

module.exports = {
    sequelize, Usuario, Laboratorio, Especialidad, TipoMedic,
    Medicamento, OrdenCompra, DetalleOrdenCompra, OrdenVenta, DetalleOrdenVta
};