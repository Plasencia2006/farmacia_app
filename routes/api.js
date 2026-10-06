// routes/api.js
const express = require('express');
const router = express.Router();
const { verificarToken, verificarRol, esAdmin, esAdminOModerador } = require('../middleware/auth');

const medicamentoCtrl = require('../controllers/medicamentoController');
const ordenCtrl = require('../controllers/ordenController');
const catalogoCtrl = require('../controllers/catalogoController');

// ===== MEDICAMENTOS =====
// Todos los autenticados pueden ver
router.get('/medicamentos', verificarToken, medicamentoCtrl.listar);

// Solo admin y moderador pueden crear/editar
router.post('/medicamentos', verificarToken, esAdminOModerador, medicamentoCtrl.crear);
router.put('/medicamentos/:id', verificarToken, esAdminOModerador, medicamentoCtrl.actualizar);

// Solo admin puede eliminar
router.delete('/medicamentos/:id', verificarToken, esAdmin, medicamentoCtrl.eliminar);

// ===== LABORATORIOS =====
router.get('/laboratorios', verificarToken, catalogoCtrl.getLaboratorios);
router.post('/laboratorios', verificarToken, esAdminOModerador, catalogoCtrl.createLaboratorio);
router.put('/laboratorios/:id', verificarToken, esAdminOModerador, catalogoCtrl.updateLaboratorio);
router.delete('/laboratorios/:id', verificarToken, esAdmin, catalogoCtrl.deleteLaboratorio);

// ===== ESPECIALIDADES Y TIPOS =====
router.get('/especialidades', verificarToken, catalogoCtrl.getEspecialidades);
router.post('/especialidades', verificarToken, esAdminOModerador, catalogoCtrl.createEspecialidad);
router.delete('/especialidades/:id', verificarToken, esAdmin, catalogoCtrl.deleteEspecialidad);

router.get('/tipos-medic', verificarToken, catalogoCtrl.getTiposMedic);
router.post('/tipos-medic', verificarToken, esAdminOModerador, catalogoCtrl.createTipoMedic);

// ===== ÓRDENES DE COMPRA =====
// Solo admin y moderador pueden ver (usuario no tiene acceso)
router.get('/ordenes/compras', verificarToken, esAdminOModerador, ordenCtrl.listarCompras);
router.post('/ordenes/compras', verificarToken, esAdmin, ordenCtrl.crearCompra);
router.put('/ordenes/compras/:id', verificarToken, esAdmin, ordenCtrl.actualizarCompra);
router.delete('/ordenes/compras/:id', verificarToken, esAdmin, ordenCtrl.eliminarCompra);

// ===== ÓRDENES DE VENTA =====
// Todos pueden ver
router.get('/ordenes/ventas', verificarToken, ordenCtrl.listarVentas);

// Admin y moderador pueden crear
router.post('/ordenes/ventas', verificarToken, esAdminOModerador, ordenCtrl.crearVenta);

// Solo admin puede editar/eliminar
router.put('/ordenes/ventas/:id', verificarToken, esAdmin, ordenCtrl.actualizarVenta);
router.delete('/ordenes/ventas/:id', verificarToken, esAdmin, ordenCtrl.eliminarVenta);

module.exports = router;