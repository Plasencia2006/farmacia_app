// routes/ordenes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ordenController');
const { verificarToken, verificarRol } = require('../middleware/auth');

// Órdenes de Compra (Solo Admin puede crear, Moderador puede ver)
router.get('/compras', verificarToken, ctrl.listarCompras);
router.post('/compras', verificarToken, verificarRol('administrador'), ctrl.crearCompra);

// Órdenes de Venta (Admin y Moderador pueden crear)
router.get('/ventas', verificarToken, ctrl.listarVentas);
router.post('/ventas', verificarToken, verificarRol('administrador', 'moderador'), ctrl.crearVenta);

module.exports = router;