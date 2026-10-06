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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/', viewRoutes);

app.get('/', (req, res) => {
    res.redirect('/login');
});

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    console.log('✅ BD sincronizada');
    app.listen(PORT, () => {
        console.log('🚀 Servidor corriendo en puerto ' + PORT);
    });
}).catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
});