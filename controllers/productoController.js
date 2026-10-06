// controllers/productoController.js
const { Producto, Categoria } = require('../models/index');

exports.crear = async (req, res) => {
    try {
        const producto = await Producto.create(req.body);
        res.status(201).json(producto);
    } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.listar = async (req, res) => {
    const productos = await Producto.findAll({ include: { model: Categoria, as: 'categoria' } });
    res.json(productos);
};

exports.actualizar = async (req, res) => {
    await Producto.update(req.body, { where: { id: req.params.id } });
    res.json({ mensaje: 'Producto actualizado' });
};

exports.eliminar = async (req, res) => {
    await Producto.destroy({ where: { id: req.params.id } });
    res.json({ mensaje: 'Producto eliminado' });
};