// controllers/medicamentoController.js
const { Medicamento, TipoMedic, Especialidad } = require('../models/index');

exports.listar = async (req, res) => {
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
};

exports.crear = async (req, res) => {
    try {
        const med = await Medicamento.create(req.body);
        res.status(201).json(med);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.actualizar = async (req, res) => {
    try {
        await Medicamento.update(req.body, { where: { CodMedicamento: req.params.id } });
        res.json({ mensaje: 'Medicamento actualizado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.eliminar = async (req, res) => {
    try {
        await Medicamento.destroy({ where: { CodMedicamento: req.params.id } });
        res.json({ mensaje: 'Medicamento eliminado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};