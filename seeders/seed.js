// seeders/seed.js
const {
    sequelize,
    Usuario,
    Laboratorio,
    Especialidad,
    TipoMedic,
    Medicamento,
    OrdenCompra,
    DetalleOrdenCompra,
    OrdenVenta,
    DetalleOrdenVta
} = require('../models/index');
const bcrypt = require('bcryptjs');

async function sembrar() {
    try {
        console.log('🔄 Sincronizando base de datos...');
        await sequelize.sync();
        console.log('✅ Tablas sincronizadas\n');

        // Verificar si ya existen datos
        const usuariosExistentes = await Usuario.count();
        const laboratoriosExistentes = await Laboratorio.count();

        if (usuariosExistentes > 0 && laboratoriosExistentes > 0) {
            console.log('ℹ️  La base de datos ya tiene datos. Omitiendo seeder.');
            console.log('✅ Proceso completado exitosamente.\n');
            process.exit(0); // ✅ Salir con código 0 (éxito)
        }

        console.log('🌱 Insertando datos iniciales...\n');

        // 1. USUARIOS
        console.log('👥 Insertando usuarios...');
        const passwordHash = await bcrypt.hash('123456', 8);

        await Usuario.bulkCreate([
            { nombre: 'Admin Farmacia', email: 'admin@farmacia.com', password: passwordHash, rol: 'administrador' },
            { nombre: 'Moderador Ventas', email: 'mod@farmacia.com', password: passwordHash, rol: 'moderador' },
            { nombre: 'Cliente Regular', email: 'user@farmacia.com', password: passwordHash, rol: 'usuario' }
        ]);
        console.log('   ✅ 3 usuarios insertados\n');

        // 2. LABORATORIOS
        console.log(' Insertando laboratorios...');
        const [lab1, lab2, lab3] = await Laboratorio.bulkCreate([
            { razonSocial: 'Laboratorios Pfizer S.A.', direccion: 'Av. Javier Prado 123, Lima', telefono: '01-555-1234', email: 'contacto@pfizer.pe', contacto: 'Juan Pérez' },
            { razonSocial: 'Bayer S.A.', direccion: 'Av. Arequipa 456, Lima', telefono: '01-555-5678', email: 'ventas@bayer.pe', contacto: 'María López' },
            { razonSocial: 'La Santé Laboratories', direccion: 'Av. Brasil 789, Lima', telefono: '01-555-9012', email: 'info@lasante.pe', contacto: 'Carlos Rodríguez' }
        ]);
        console.log('   ✅ 3 laboratorios insertados\n');

        // 3. ESPECIALIDADES
        console.log('💊 Insertando especialidades...');
        const [esp1, esp2, esp3, esp4] = await Especialidad.bulkCreate([
            { descripcionEsp: 'Analgésicos' },
            { descripcionEsp: 'Antibióticos' },
            { descripcionEsp: 'Vitaminas y Suplementos' },
            { descripcionEsp: 'Antiinflamatorios' }
        ]);
        console.log('   ✅ 4 especialidades insertadas\n');

        // 4. TIPOS DE MEDICAMENTOS
        console.log('💊 Insertando tipos de medicamentos...');
        const [tipo1, tipo2, tipo3, tipo4] = await TipoMedic.bulkCreate([
            { descripcion: 'Tableta' },
            { descripcion: 'Jarabe' },
            { descripcion: 'Cápsula' },
            { descripcion: 'Inyectable' }
        ]);
        console.log('   ✅ 4 tipos de medicamentos insertados\n');

        // 5. MEDICAMENTOS
        console.log('💊 Insertando medicamentos...');
        const meds = await Medicamento.bulkCreate([
            { descripcionMed: 'Paracetamol 500mg', fechaFabricacion: '2025-01-15', fechaVencimiento: '2027-01-15', Presentacion: 'Caja x 20 tabletas', stock: 100, precioVentaUni: 0.50, precioVentaPres: 10.00, Marca: 'Genfar', CodTipoMed: tipo1.CodTipoMed, CodEspec: esp1.CodEspec },
            { descripcionMed: 'Amoxicilina 500mg', fechaFabricacion: '2025-03-01', fechaVencimiento: '2026-03-01', Presentacion: 'Caja x 21 cápsulas', stock: 50, precioVentaUni: 1.20, precioVentaPres: 25.20, Marca: 'Bayer', CodTipoMed: tipo3.CodTipoMed, CodEspec: esp2.CodEspec },
            { descripcionMed: 'Vitamina C 1000mg', fechaFabricacion: '2025-05-10', fechaVencimiento: '2026-05-10', Presentacion: 'Frasco x 30 tabletas', stock: 80, precioVentaUni: 0.80, precioVentaPres: 24.00, Marca: 'Redoxon', CodTipoMed: tipo1.CodTipoMed, CodEspec: esp3.CodEspec },
            { descripcionMed: 'Ibuprofeno 400mg', fechaFabricacion: '2025-02-20', fechaVencimiento: '2026-02-20', Presentacion: 'Caja x 10 tabletas', stock: 60, precioVentaUni: 0.70, precioVentaPres: 7.00, Marca: 'Motrin', CodTipoMed: tipo1.CodTipoMed, CodEspec: esp4.CodEspec },
            { descripcionMed: 'Jarabe para la tos', fechaFabricacion: '2025-04-01', fechaVencimiento: '2026-04-01', Presentacion: 'Frasco x 120ml', stock: 40, precioVentaUni: 3.50, precioVentaPres: 3.50, Marca: 'Vick', CodTipoMed: tipo2.CodTipoMed, CodEspec: esp1.CodEspec },
            { descripcionMed: 'Ceftriaxona 1g', fechaFabricacion: '2025-06-01', fechaVencimiento: '2026-06-01', Presentacion: 'Vial inyectable', stock: 30, precioVentaUni: 5.00, precioVentaPres: 5.00, Marca: 'Rocephin', CodTipoMed: tipo4.CodTipoMed, CodEspec: esp2.CodEspec }
        ]);
        console.log('   ✅ 6 medicamentos insertados\n');

        // 6. ORDEN DE COMPRA
        console.log('🛒 Insertando órdenes de compra...');
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
        console.log('   ✅ Órdenes de compra insertadas\n');

        // 7. ORDEN DE VENTA
        console.log('💰 Insertando órdenes de venta...');
        const ordenVenta1 = await OrdenVenta.create({
            fechaEmision: new Date('2025-10-06'),
            Motivo: 'Venta mostrador - Cliente regular',
            Situacion: 'completada'
        });

        await DetalleOrdenVta.bulkCreate([
            { NroOrdenVta: ordenVenta1.NroOrdenVta, CodMedicamento: meds[0].CodMedicamento, descripcionMed: 'Paracetamol 500mg', cantidadRequerida: 2 },
            { NroOrdenVta: ordenVenta1.NroOrdenVta, CodMedicamento: meds[2].CodMedicamento, descripcionMed: 'Vitamina C 1000mg', cantidadRequerida: 1 }
        ]);
        console.log('   ✅ Órdenes de venta insertadas\n');

        console.log('═══════════════════════════════════════════');
        console.log('🎉 ¡Datos iniciales insertados con éxito!');
        console.log('═══════════════════════════════════════════\n');
        console.log('🔐 Credenciales de prueba:');
        console.log('   Admin:     admin@farmacia.com / 123456');
        console.log('   Moderador: mod@farmacia.com / 123456');
        console.log('   Usuario:   user@farmacia.com / 123456\n');

        process.exit(0); // ✅ Salir con código 0 (éxito)

    } catch (error) {
        console.error('❌ Error en el seeder:', error);
        console.error('Detalles:', error.message);
        process.exit(1); // ❌ Solo salir con error si hay un problema real
    }
}

sembrar();