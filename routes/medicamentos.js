// routes/medicamentos.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/medicamentoController');
const { verificarToken, verificarRol } = require('../middleware/auth');

router.get('/', verificarToken, ctrl.listar);
router.post('/', verificarToken, verificarRol('administrador', 'moderador'), ctrl.crear);
router.put('/:id', verificarToken, verificarRol('administrador', 'moderador'), ctrl.actualizar);
router.delete('/:id', verificarToken, verificarRol('administrador'), ctrl.eliminar);

module.exports = router;