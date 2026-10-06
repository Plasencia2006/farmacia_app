// middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verificarToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ mensaje: 'Token requerido' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ mensaje: 'Token inválido o expirado' });
        req.usuario = decoded;
        next();
    });
};

// Verificar roles específicos
const verificarRol = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.usuario.rol)) {
            return res.status(403).json({
                mensaje: 'No tienes permisos para esta acción',
                rolRequerido: roles
            });
        }
        next();
    };
};

// Verificar si es admin
const esAdmin = (req, res, next) => {
    if (req.usuario.rol !== 'administrador') {
        return res.status(403).json({ mensaje: 'Solo administradores pueden realizar esta acción' });
    }
    next();
};

// Verificar si es admin o moderador
const esAdminOModerador = (req, res, next) => {
    if (!['administrador', 'moderador'].includes(req.usuario.rol)) {
        return res.status(403).json({ mensaje: 'Solo administradores o moderadores pueden realizar esta acción' });
    }
    next();
};

module.exports = { verificarToken, verificarRol, esAdmin, esAdminOModerador };