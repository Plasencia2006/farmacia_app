// controllers/ordenController.js - Agregar estos métodos al final

// Actualizar Orden de Compra
exports.actualizarCompra = async (req, res) => {
    try {
        await OrdenCompra.update(req.body, { where: { NroOrdenC: req.params.id } });
        res.json({ mensaje: 'Orden de compra actualizada' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar Orden de Compra
exports.eliminarCompra = async (req, res) => {
    try {
        await DetalleOrdenCompra.destroy({ where: { NroOrdenC: req.params.id } });
        await OrdenCompra.destroy({ where: { NroOrdenC: req.params.id } });
        res.json({ mensaje: 'Orden de compra eliminada' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar Orden de Venta
exports.actualizarVenta = async (req, res) => {
    try {
        await OrdenVenta.update(req.body, { where: { NroOrdenVta: req.params.id } });
        res.json({ mensaje: 'Orden de venta actualizada' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar Orden de Venta
exports.eliminarVenta = async (req, res) => {
    try {
        await DetalleOrdenVta.destroy({ where: { NroOrdenVta: req.params.id } });
        await OrdenVenta.destroy({ where: { NroOrdenVta: req.params.id } });
        res.json({ mensaje: 'Orden de venta eliminada' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};