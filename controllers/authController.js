// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Usuario } = require('../models/index');
require('dotenv').config();

exports.registrar = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;
        const nuevoUsuario = await Usuario.create({ nombre, email, password, rol });
        res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al registrar', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

        const esValido = await bcrypt.compare(password, usuario.password);
        if (!esValido) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

        // 1. Generar JWT
        const token = jwt.sign(
            { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        ); // <-- Aquí se cierra correctamente el jwt.sign

        // 2. Guardar el token en una cookie para el frontend
        res.cookie('token', token, { httpOnly: false, maxAge: 8 * 60 * 60 * 1000 }); // 8 horas 

        // 3. Enviar respuesta
        res.json({
            mensaje: 'Login exitoso',
            token,
            usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol }
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};