const express = require('express');
const router = express.Router();
const { verificarToken, verificarRol } = require('../middleware/auth');

// Importar modelos directamente
const {
    Medicamento, TipoMedic, Especialidad,
    Laboratorio, OrdenCompra, DetalleOrdenCompra,
    OrdenVenta, DetalleOrdenVta, sequelize
} = require('../models/index');

// ===== MEDICAMENTOS =====
router.get('/medicamentos', verificarToken, async (req, res) => {
    try {
        const medicamentos = await Medicamento.findAll({
            include: [
                { model: TipoMedic, as: 'tipoMedicamento' },
                { model: Especialidad, as: 'especialidad' }
            ]
        });
        res.json(medicamentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/medicamentos', verificarToken, verificarRol('administrador', 'moderador'), async (req, res) => {
    try {
        const med = await Medicamento.create(req.body);
        res.status(201).json(med);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/medicamentos/:id', verificarToken, verificarRol('administrador', 'moderador'), async (req, res) => {
    try {
        await Medicamento.update(req.body, { where: { CodMedicamento: req.params.id } });
        res.json({ mensaje: 'Medicamento actualizado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/medicamentos/:id', verificarToken, verificarRol('administrador'), async (req, res) => {
    try {
        await Medicamento.destroy({ where: { CodMedicamento: req.params.id } });
        res.json({ mensaje: 'Medicamento eliminado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ===== LABORATORIOS =====
router.get('/laboratorios', verificarToken, async (req, res) => {
    try {
        const labs = await Laboratorio.findAll();
        res.json(labs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/laboratorios', verificarToken, verificarRol('administrador', 'moderador'), async (req, res) => {
    try {
        const lab = await Laboratorio.create(req.body);
        res.status(201).json(lab);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/laboratorios/:id', verificarToken, verificarRol('administrador', 'moderador'), async (req, res) => {
    try {
        await Laboratorio.update(req.body, { where: { CodLab: req.params.id } });
        res.json({ mensaje: 'Laboratorio actualizado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/laboratorios/:id', verificarToken, verificarRol('administrador'), async (req, res) => {
    try {
        await Laboratorio.destroy({ where: { CodLab: req.params.id } });
        res.json({ mensaje: 'Laboratorio eliminado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ===== ESPECIALIDADES =====
router.get('/especialidades', verificarToken, async (req, res) => {
    try {
        const esp = await Especialidad.findAll();
        res.json(esp);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/especialidades', verificarToken, verificarRol('administrador', 'moderador'), async (req, res) => {
    try {
        const esp = await Especialidad.create(req.body);
        res.status(201).json(esp);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ===== TIPOS DE MEDICAMENTOS =====
router.get('/tipos-medic', verificarToken, async (req, res) => {
    try {
        const tipos = await TipoMedic.findAll();
        res.json(tipos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/tipos-medic', verificarToken, verificarRol('administrador', 'moderador'), async (req, res) => {
    try {
        const tipo = await TipoMedic.create(req.body);
        res.status(201).json(tipo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ===== ÓRDENES DE COMPRA =====
router.get('/ordenes/compras', verificarToken, async (req, res) => {
    try {
        const ordenes = await OrdenCompra.findAll({
            include: [{ model: Laboratorio, as: 'laboratorio' }]
        });
        res.json(ordenes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/ordenes/compras', verificarToken, verificarRol('administrador'), async (req, res) => {
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
});

router.put('/ordenes/compras/:id', verificarToken, verificarRol('administrador'), async (req, res) => {
    try {
        await OrdenCompra.update(req.body, { where: { NroOrdenC: req.params.id } });
        res.json({ mensaje: 'Orden de compra actualizada' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/ordenes/compras/:id', verificarToken, verificarRol('administrador'), async (req, res) => {
    try {
        await DetalleOrdenCompra.destroy({ where: { NroOrdenC: req.params.id } });
        await OrdenCompra.destroy({ where: { NroOrdenC: req.params.id } });
        res.json({ mensaje: 'Orden de compra eliminada' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ===== ÓRDENES DE VENTA =====
router.get('/ordenes/ventas', verificarToken, async (req, res) => {
    try {
        const ordenes = await OrdenVenta.findAll();
        res.json(ordenes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/ordenes/ventas', verificarToken, verificarRol('administrador', 'moderador'), async (req, res) => {
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
});

router.put('/ordenes/ventas/:id', verificarToken, verificarRol('administrador'), async (req, res) => {
    try {
        await OrdenVenta.update(req.body, { where: { NroOrdenVta: req.params.id } });
        res.json({ mensaje: 'Orden de venta actualizada' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/ordenes/ventas/:id', verificarToken, verificarRol('administrador'), async (req, res) => {
    try {
        await DetalleOrdenVta.destroy({ where: { NroOrdenVta: req.params.id } });
        await OrdenVenta.destroy({ where: { NroOrdenVta: req.params.id } });
        res.json({ mensaje: 'Orden de venta eliminada' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;