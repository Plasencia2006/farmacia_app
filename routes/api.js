// routes/api.js
const express = require('express');
const router = express.Router();
const { verificarToken, verificarRol } = require('../middleware/auth');

// Importar los NUEVOS controladores
const medicamentoCtrl = require('../controllers/medicamentoController');
const ordenCtrl = require('../controllers/ordenController');
const catalogoCtrl = require('../controllers/catalogoController');

// ===== MEDICAMENTOS =====
router.get('/medicamentos', verificarToken, medicamentoCtrl.listar);
router.post('/medicamentos', verificarToken, verificarRol('administrador', 'moderador'), medicamentoCtrl.crear);
router.put('/medicamentos/:id', verificarToken, verificarRol('administrador', 'moderador'), medicamentoCtrl.actualizar);
router.delete('/medicamentos/:id', verificarToken, verificarRol('administrador'), medicamentoCtrl.eliminar);

// ===== ÓRDENES DE COMPRA =====
router.get('/ordenes/compras', verificarToken, ordenCtrl.listarCompras);
router.post('/ordenes/compras', verificarToken, verificarRol('administrador'), ordenCtrl.crearCompra);

// ===== ÓRDENES DE VENTA =====
router.get('/ordenes/ventas', verificarToken, ordenCtrl.listarVentas);
router.post('/ordenes/ventas', verificarToken, verificarRol('administrador', 'moderador'), ordenCtrl.crearVenta);

// ===== CATÁLOGOS (Laboratorios, Especialidades, Tipos) =====
router.get('/laboratorios', verificarToken, catalogoCtrl.getLaboratorios);
router.post('/laboratorios', verificarToken, verificarRol('administrador', 'moderador'), catalogoCtrl.createLaboratorio);
router.put('/laboratorios/:id', verificarToken, verificarRol('administrador', 'moderador'), catalogoCtrl.updateLaboratorio);
router.delete('/laboratorios/:id', verificarToken, verificarRol('administrador'), catalogoCtrl.deleteLaboratorio);

router.get('/especialidades', verificarToken, catalogoCtrl.getEspecialidades);
router.post('/especialidades', verificarToken, verificarRol('administrador', 'moderador'), catalogoCtrl.createEspecialidad);
router.delete('/especialidades/:id', verificarToken, verificarRol('administrador'), catalogoCtrl.deleteEspecialidad);

router.get('/tipos-medic', verificarToken, catalogoCtrl.getTiposMedic);
router.post('/tipos-medic', verificarToken, verificarRol('administrador', 'moderador'), catalogoCtrl.createTipoMedic);

module.exports = router;