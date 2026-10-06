// controllers/catalogoController.js
const { Laboratorio, Especialidad, TipoMedic } = require('../models/index');

// ===== LABORATORIOS =====
exports.getLaboratorios = async (req, res) => {
    try {
        const labs = await Laboratorio.findAll();
        res.json(labs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createLaboratorio = async (req, res) => {
    try {
        const lab = await Laboratorio.create(req.body);
        res.status(201).json(lab);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateLaboratorio = async (req, res) => {
    try {
        await Laboratorio.update(req.body, { where: { CodLab: req.params.id } });
        res.json({ mensaje: 'Laboratorio actualizado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteLaboratorio = async (req, res) => {
    try {
        await Laboratorio.destroy({ where: { CodLab: req.params.id } });
        res.json({ mensaje: 'Laboratorio eliminado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ===== ESPECIALIDADES =====
exports.getEspecialidades = async (req, res) => {
    try {
        const esp = await Especialidad.findAll();
        res.json(esp);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createEspecialidad = async (req, res) => {
    try {
        const esp = await Especialidad.create(req.body);
        res.status(201).json(esp);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteEspecialidad = async (req, res) => {
    try {
        await Especialidad.destroy({ where: { CodEspec: req.params.id } });
        res.json({ mensaje: 'Especialidad eliminada' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ===== TIPOS DE MEDICAMENTOS =====
exports.getTiposMedic = async (req, res) => {
    try {
        const tipos = await TipoMedic.findAll();
        res.json(tipos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createTipoMedic = async (req, res) => {
    try {
        const tipo = await TipoMedic.create(req.body);
        res.status(201).json(tipo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};