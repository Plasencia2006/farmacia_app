// routes/views.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {
    Medicamento, TipoMedic, Especialidad, Laboratorio,
    OrdenCompra, OrdenVenta
} = require('../models/index');
require('dotenv').config();

// Middleware para verificar sesión
const verificarSesion = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) return res.redirect('/login');
    try {
        req.usuario = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.clearCookie('token');
        res.redirect('/login');
    }
};

// ===== RUTAS PÚBLICAS (sin verificarSesion) =====
router.get('/login', (req, res) => {
    res.render('login', { titulo: 'Iniciar Sesión' });
});

router.get('/registro', (req, res) => {
    res.render('registro', { titulo: 'Registro' });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});

// ===== RUTAS PROTEGIDAS =====
router.get('/', verificarSesion, (req, res) => {
    res.redirect('/dashboard');
});

// routes/views.js - Actualiza la ruta del dashboard

router.get('/dashboard', verificarSesion, async (req, res) => {
    const { Medicamento, Laboratorio, OrdenCompra, OrdenVenta } = require('../models/index');

    const medicamentosCount = await Medicamento.count();
    const laboratoriosCount = await Laboratorio.count();
    const ordenesCompraCount = await OrdenCompra.count();
    const ordenesVentaCount = await OrdenVenta.count();

    res.render('dashboard', {
        titulo: 'Dashboard',
        usuario: req.usuario,
        medicamentosCount,
        laboratoriosCount,
        ordenesCompraCount,
        ordenesVentaCount
    });
});

router.get('/medicamentos', verificarSesion, async (req, res) => {
    const medicamentos = await Medicamento.findAll({
        include: [{ model: TipoMedic, as: 'tipoMedicamento' }, { model: Especialidad, as: 'especialidad' }]
    });
    const tipos = await TipoMedic.findAll();
    const especialidades = await Especialidad.findAll();
    res.render('medicamentos', { titulo: 'Medicamentos', usuario: req.usuario, medicamentos, tipos, especialidades });
});

router.get('/laboratorios', verificarSesion, async (req, res) => {
    const laboratorios = await Laboratorio.findAll();
    res.render('laboratorios', { titulo: 'Laboratorios', usuario: req.usuario, laboratorios });
});

router.get('/ordenes-compra', verificarSesion, async (req, res) => {
    try {
        const ordenes = await OrdenCompra.findAll({
            include: [{ model: Laboratorio, as: 'laboratorio' }]
        });
        const laboratorios = await Laboratorio.findAll(); // 👈 ESTA LÍNEA ES CRÍTICA

        res.render('ordenes-compra', {
            titulo: 'Órdenes de Compra',
            usuario: req.usuario,
            ordenes,
            laboratorios  // 👈 PASAR LA VARIABLE A LA VISTA
        });
    } catch (error) {
        console.error('Error al cargar órdenes de compra:', error);
        res.status(500).send('Error al cargar la página');
    }
});

router.get('/ordenes-venta', verificarSesion, async (req, res) => {
    const ordenes = await OrdenVenta.findAll();
    res.render('ordenes-venta', { titulo: 'Órdenes de Venta', usuario: req.usuario, ordenes });
});


module.exports = router;