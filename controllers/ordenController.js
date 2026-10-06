// controllers/ordenController.js
const { sequelize, OrdenCompra, DetalleOrdenCompra, Laboratorio, Medicamento, OrdenVenta, DetalleOrdenVta } = require('../models/index');

// ===== ÓRDENES DE COMPRA =====
exports.listarCompras = async (req, res) => {
    try {
        const ordenes = await OrdenCompra.findAll({
            include: [
                { model: Laboratorio, as: 'laboratorio' },
                { model: DetalleOrdenCompra, as: 'detalles', include: { model: Medicamento, as: 'medicamento' } }
            ]
        });
        res.json(ordenes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.crearCompra = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { detalles, ...ordenData } = req.body;

        const orden = await OrdenCompra.create(ordenData, { transaction: t });

        if (detalles && detalles.length > 0) {
            const detallesConNro = detalles.map(d => ({ ...d, NroOrdenC: orden.NroOrdenC }));
            await DetalleOrdenCompra.bulkCreate(detallesConNro, { transaction: t });
        }

        await t.commit();
        res.status(201).json({ mensaje: 'Orden de compra creada', orden });
    } catch (error) {
        await t.rollback();
        res.status(400).json({ error: error.message });
    }
};

// ===== ÓRDENES DE VENTA =====
exports.listarVentas = async (req, res) => {
    try {
        const ordenes = await OrdenVenta.findAll({
            include: [
                { model: DetalleOrdenVta, as: 'detalles', include: { model: Medicamento, as: 'medicamento' } }
            ]
        });
        res.json(ordenes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.crearVenta = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { detalles, ...ordenData } = req.body;

        const orden = await OrdenVenta.create(ordenData, { transaction: t });

        if (detalles && detalles.length > 0) {
            const detallesConNro = detalles.map(d => ({ ...d, NroOrdenVta: orden.NroOrdenVta }));
            await DetalleOrdenVta.bulkCreate(detallesConNro, { transaction: t });
        }

        await t.commit();
        res.status(201).json({ mensaje: 'Orden de venta creada', orden });
    } catch (error) {
        await t.rollback();
        res.status(400).json({ error: error.message });
    }
};