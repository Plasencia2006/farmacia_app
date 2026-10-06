// routes/catalogo.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/catalogoController');
const { verificarToken, verificarRol } = require('../middleware/auth');

// Todos los autenticados pueden ver
router.get('/laboratorios', verificarToken, ctrl.getLaboratorios);
router.get('/especialidades', verificarToken, ctrl.getEspecialidades);
router.get('/tipos-medic', verificarToken, ctrl.getTiposMedic);

// Solo Admin y Moderador pueden crear/editar/borrar
router.post('/laboratorios', verificarToken, verificarRol('administrador', 'moderador'), ctrl.createLaboratorio);
router.put('/laboratorios/:id', verificarToken, verificarRol('administrador', 'moderador'), ctrl.updateLaboratorio);
router.delete('/laboratorios/:id', verificarToken, verificarRol('administrador'), ctrl.deleteLaboratorio);

router.post('/especialidades', verificarToken, verificarRol('administrador', 'moderador'), ctrl.createEspecialidad);
router.delete('/especialidades/:id', verificarToken, verificarRol('administrador'), ctrl.deleteEspecialidad);

router.post('/tipos-medic', verificarToken, verificarRol('administrador', 'moderador'), ctrl.createTipoMedic);

module.exports = router;