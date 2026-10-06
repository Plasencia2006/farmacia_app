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

// 🔧 ENDPOINT TEMPORAL para forzar el seeder
app.get('/force-seed', async (req, res) => {
    try {
        console.log('🔄 Forzando ejecución del seeder...');

        // Importar la función del seeder
        const {
            Usuario, Laboratorio, Especialidad, TipoMedic,
            Medicamento, OrdenCompra, DetalleOrdenCompra,
            OrdenVenta, DetalleOrdenVta
        } = require('./models/index');
        const bcrypt = require('bcryptjs');

        // Sincronizar tablas (sin borrar datos existentes)
        await sequelize.sync();
        console.log('✅ Tablas sincronizadas');

        // Verificar si ya existen datos
        const usuariosExistentes = await Usuario.count();

        if (usuariosExistentes > 0) {
            // Borrar datos existentes para reiniciar
            console.log('⚠️  Borrando datos existentes...');
            await DetalleOrdenVta.destroy({ where: {} });
            await DetalleOrdenCompra.destroy({ where: {} });
            await OrdenVenta.destroy({ where: {} });
            await OrdenCompra.destroy({ where: {} });
            await Medicamento.destroy({ where: {} });
            await TipoMedic.destroy({ where: {} });
            await Especialidad.destroy({ where: {} });
            await Laboratorio.destroy({ where: {} });
            await Usuario.destroy({ where: {} });
            console.log('✅ Datos borrados');
        }

        // Insertar datos
        console.log(' Insertando datos iniciales...');

        const passwordHash = await bcrypt.hash('123456', 8);

        await Usuario.bulkCreate([
            { nombre: 'Admin Farmacia', email: 'admin@farmacia.com', password: passwordHash, rol: 'administrador' },
            { nombre: 'Moderador Ventas', email: 'mod@farmacia.com', password: passwordHash, rol: 'moderador' },
            { nombre: 'Cliente Regular', email: 'user@farmacia.com', password: passwordHash, rol: 'usuario' }
        ]);

        const [lab1, lab2, lab3] = await Laboratorio.bulkCreate([
            { razonSocial: 'Laboratorios Pfizer S.A.', direccion: 'Av. Javier Prado 123, Lima', telefono: '01-555-1234', email: 'contacto@pfizer.pe', contacto: 'Juan Pérez' },
            { razonSocial: 'Bayer S.A.', direccion: 'Av. Arequipa 456, Lima', telefono: '01-555-5678', email: 'ventas@bayer.pe', contacto: 'María López' },
            { razonSocial: 'La Santé Laboratories', direccion: 'Av. Brasil 789, Lima', telefono: '01-555-9012', email: 'info@lasante.pe', contacto: 'Carlos Rodríguez' }
        ]);

        const [esp1, esp2, esp3, esp4] = await Especialidad.bulkCreate([
            { descripcionEsp: 'Analgésicos' },
            { descripcionEsp: 'Antibióticos' },
            { descripcionEsp: 'Vitaminas y Suplementos' },
            { descripcionEsp: 'Antiinflamatorios' }
        ]);

        const [tipo1, tipo2, tipo3, tipo4] = await TipoMedic.bulkCreate([
            { descripcion: 'Tableta' },
            { descripcion: 'Jarabe' },
            { descripcion: 'Cápsula' },
            { descripcion: 'Inyectable' }
        ]);

        const meds = await Medicamento.bulkCreate([
            { descripcionMed: 'Paracetamol 500mg', fechaFabricacion: '2025-01-15', fechaVencimiento: '2027-01-15', Presentacion: 'Caja x 20 tabletas', stock: 100, precioVentaUni: 0.50, precioVentaPres: 10.00, Marca: 'Genfar', CodTipoMed: tipo1.CodTipoMed, CodEspec: esp1.CodEspec },
            { descripcionMed: 'Amoxicilina 500mg', fechaFabricacion: '2025-03-01', fechaVencimiento: '2026-03-01', Presentacion: 'Caja x 21 cápsulas', stock: 50, precioVentaUni: 1.20, precioVentaPres: 25.20, Marca: 'Bayer', CodTipoMed: tipo3.CodTipoMed, CodEspec: esp2.CodEspec },
            { descripcionMed: 'Vitamina C 1000mg', fechaFabricacion: '2025-05-10', fechaVencimiento: '2026-05-10', Presentacion: 'Frasco x 30 tabletas', stock: 80, precioVentaUni: 0.80, precioVentaPres: 24.00, Marca: 'Redoxon', CodTipoMed: tipo1.CodTipoMed, CodEspec: esp3.CodEspec },
            { descripcionMed: 'Ibuprofeno 400mg', fechaFabricacion: '2025-02-20', fechaVencimiento: '2026-02-20', Presentacion: 'Caja x 10 tabletas', stock: 60, precioVentaUni: 0.70, precioVentaPres: 7.00, Marca: 'Motrin', CodTipoMed: tipo1.CodTipoMed, CodEspec: esp4.CodEspec },
            { descripcionMed: 'Jarabe para la tos', fechaFabricacion: '2025-04-01', fechaVencimiento: '2026-04-01', Presentacion: 'Frasco x 120ml', stock: 40, precioVentaUni: 3.50, precioVentaPres: 3.50, Marca: 'Vick', CodTipoMed: tipo2.CodTipoMed, CodEspec: esp1.CodEspec },
            { descripcionMed: 'Ceftriaxona 1g', fechaFabricacion: '2025-06-01', fechaVencimiento: '2026-06-01', Presentacion: 'Vial inyectable', stock: 30, precioVentaUni: 5.00, precioVentaPres: 5.00, Marca: 'Rocephin', CodTipoMed: tipo4.CodTipoMed, CodEspec: esp2.CodEspec }
        ]);

        const ordenCompra1 = await OrdenCompra.create({
            fechaEmision: new Date('2025-10-01'),
            Situacion: 'aprobada',
            Total: 380.00,
            CodLab: lab1.CodLab,
            NrofacturaProv: 'F001-000123'
        });

        await DetalleOrdenCompra.bulkCreate([
            { NroOrdenC: ordenCompra1.NroOrdenC, CodMedicamento: meds[0].CodMedicamento, descripcion: 'Paracetamol 500mg', cantidad: 200, precio: 0.30, montouni: 60.00 },
            { NroOrdenC: ordenCompra1.NroOrdenC, CodMedicamento: meds[1].CodMedicamento, descripcion: 'Amoxicilina 500mg', cantidad: 100, precio: 0.80, montouni: 80.00 }
        ]);

        const ordenVenta1 = await OrdenVenta.create({
            fechaEmision: new Date('2025-10-06'),
            Motivo: 'Venta mostrador - Cliente regular',
            Situacion: 'completada'
        });

        await DetalleOrdenVta.bulkCreate([
            { NroOrdenVta: ordenVenta1.NroOrdenVta, CodMedicamento: meds[0].CodMedicamento, descripcionMed: 'Paracetamol 500mg', cantidadRequerida: 2 },
            { NroOrdenVta: ordenVenta1.NroOrdenVta, CodMedicamento: meds[2].CodMedicamento, descripcionMed: 'Vitamina C 1000mg', cantidadRequerida: 1 }
        ]);

        res.json({
            mensaje: '✅ Seeder ejecutado con éxito',
            datos: {
                usuarios: 3,
                laboratorios: 3,
                especialidades: 4,
                tiposMedicamentos: 4,
                medicamentos: 6,
                ordenesCompra: 1,
                ordenesVenta: 1
            }
        });
    } catch (error) {
        console.error('❌ Error en el seeder:', error);
        res.status(500).json({
            error: 'Error al ejecutar el seeder',
            detalle: error.message
        });
    }
});

// Ruta raíz
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Sincronizar BD y levantar servidor
const PORT = process.env.PORT || 3000;
sequelize.sync()
    .then(() => {
        console.log('✅ Base de datos sincronizada');
        app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
    })
    .catch(err => console.error('❌ Error al sincronizar BD:', err));