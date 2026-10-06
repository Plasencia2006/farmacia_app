// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models/index');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const viewRoutes = require('./routes/views');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configurar Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/', viewRoutes);

// Ruta raíz
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Sincronizar BD y levantar servidor
const PORT = process.env.PORT || 3000;

sequelize.sync()
    .then(async () => {
        console.log('✅ Base de datos sincronizada');

        // Ejecutar seeder automáticamente en desarrollo
        if (process.env.NODE_ENV !== 'production') {
            try {
                await require('./seeders/seed');
            } catch (err) {
                console.log('️  Seeder ya ejecutado o error:', err.message);
            }
        }

        app.listen(PORT, () => console.log(` Servidor corriendo en puerto ${PORT}`));
    })
    .catch(err => console.error('❌ Error al sincronizar BD:', err));