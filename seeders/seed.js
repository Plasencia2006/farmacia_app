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
        console.log('🔄 Reiniciando base de datos...');
        await sequelize.sync({ force: true });
        console.log('✅ Tablas creadas/reiniciadas\n');

        // ==========================================
        // 1. USUARIOS
        // ==========================================
        console.log('👥 Insertando usuarios...');
        const passwordHash = await bcrypt.hash('123456', 8);

        const [admin, moderador, usuario] = await Usuario.bulkCreate([
            {
                nombre: 'Admin Farmacia',
                email: 'admin@farmacia.com',
                password: passwordHash,
                rol: 'administrador'
            },
            {
                nombre: 'Moderador Ventas',
                email: 'mod@farmacia.com',
                password: passwordHash,
                rol: 'moderador'
            },
            {
                nombre: 'Cliente Regular',
                email: 'user@farmacia.com',
                password: passwordHash,
                rol: 'usuario'
            }
        ]);
        console.log(`   ✅ 3 usuarios insertados (admin, moderador, usuario)\n`);

        // ==========================================
        // 2. LABORATORIOS
        // ==========================================
        console.log('🏭 Insertando laboratorios...');
        const [lab1, lab2, lab3] = await Laboratorio.bulkCreate([
            {
                razonSocial: 'Laboratorios Pfizer S.A.',
                direccion: 'Av. Javier Prado 123, Lima',
                telefono: '01-555-1234',
                email: 'contacto@pfizer.pe',
                contacto: 'Juan Pérez'
            },
            {
                razonSocial: 'Bayer S.A.',
                direccion: 'Av. Arequipa 456, Lima',
                telefono: '01-555-5678',
                email: 'ventas@bayer.pe',
                contacto: 'María López'
            },
            {
                razonSocial: 'La Santé Laboratories',
                direccion: 'Av. Brasil 789, Lima',
                telefono: '01-555-9012',
                email: 'info@lasante.pe',
                contacto: 'Carlos Rodríguez'
            }
        ]);
        console.log(`   ✅ 3 laboratorios insertados\n`);

        // ==========================================
        // 3. ESPECIALIDADES
        // ==========================================
        console.log(' Insertando especialidades...');
        const [esp1, esp2, esp3, esp4] = await Especialidad.bulkCreate([
            { descripcionEsp: 'Analgésicos' },
            { descripcionEsp: 'Antibióticos' },
            { descripcionEsp: 'Vitaminas y Suplementos' },
            { descripcionEsp: 'Antiinflamatorios' }
        ]);
        console.log(`   ✅ 4 especialidades insertadas\n`);

        // ==========================================
        // 4. TIPOS DE MEDICAMENTOS
        // ==========================================
        console.log('💊 Insertando tipos de medicamentos...');
        const [tipo1, tipo2, tipo3, tipo4] = await TipoMedic.bulkCreate([
            { descripcion: 'Tableta' },
            { descripcion: 'Jarabe' },
            { descripcion: 'Cápsula' },
            { descripcion: 'Inyectable' }
        ]);
        console.log(`   ✅ 4 tipos de medicamentos insertados\n`);

        // ==========================================
        // 5. MEDICAMENTOS
        // ==========================================
        console.log('💊 Insertando medicamentos...');
        const [med1, med2, med3, med4, med5, med6] = await Medicamento.bulkCreate([
            {
                descripcionMed: 'Paracetamol 500mg',
                fechaFabricacion: '2025-01-15',
                fechaVencimiento: '2027-01-15',
                Presentacion: 'Caja x 20 tabletas',
                stock: 100,
                precioVentaUni: 0.50,
                precioVentaPres: 10.00,
                Marca: 'Genfar',
                CodTipoMed: tipo1.CodTipoMed,
                CodEspec: esp1.CodEspec
            },
            {
                descripcionMed: 'Amoxicilina 500mg',
                fechaFabricacion: '2025-03-01',
                fechaVencimiento: '2026-03-01',
                Presentacion: 'Caja x 21 cápsulas',
                stock: 50,
                precioVentaUni: 1.20,
                precioVentaPres: 25.20,
                Marca: 'Bayer',
                CodTipoMed: tipo3.CodTipoMed,
                CodEspec: esp2.CodEspec
            },
            {
                descripcionMed: 'Vitamina C 1000mg',
                fechaFabricacion: '2025-05-10',
                fechaVencimiento: '2026-05-10',
                Presentacion: 'Frasco x 30 tabletas',
                stock: 80,
                precioVentaUni: 0.80,
                precioVentaPres: 24.00,
                Marca: 'Redoxon',
                CodTipoMed: tipo1.CodTipoMed,
                CodEspec: esp3.CodEspec
            },
            {
                descripcionMed: 'Ibuprofeno 400mg',
                fechaFabricacion: '2025-02-20',
                fechaVencimiento: '2026-02-20',
                Presentacion: 'Caja x 10 tabletas',
                stock: 60,
                precioVentaUni: 0.70,
                precioVentaPres: 7.00,
                Marca: 'Motrin',
                CodTipoMed: tipo1.CodTipoMed,
                CodEspec: esp4.CodEspec
            },
            {
                descripcionMed: 'Jarabe para la tos',
                fechaFabricacion: '2025-04-01',
                fechaVencimiento: '2026-04-01',
                Presentacion: 'Frasco x 120ml',
                stock: 40,
                precioVentaUni: 3.50,
                precioVentaPres: 3.50,
                Marca: 'Vick',
                CodTipoMed: tipo2.CodTipoMed,
                CodEspec: esp1.CodEspec
            },
            {
                descripcionMed: 'Ceftriaxona 1g',
                fechaFabricacion: '2025-06-01',
                fechaVencimiento: '2026-06-01',
                Presentacion: 'Vial inyectable',
                stock: 30,
                precioVentaUni: 5.00,
                precioVentaPres: 5.00,
                Marca: 'Rocephin',
                CodTipoMed: tipo4.CodTipoMed,
                CodEspec: esp2.CodEspec
            }
        ]);
        console.log(`   ✅ 6 medicamentos insertados\n`);

        // ==========================================
        // 6. ORDEN DE COMPRA (con detalles)
        // ==========================================
        console.log('🛒 Insertando órdenes de compra...');
        const ordenCompra1 = await OrdenCompra.create({
            fechaEmision: new Date('2025-10-01'),
            Situacion: 'aprobada',
            Total: 380.00,
            CodLab: lab1.CodLab,
            NrofacturaProv: 'F001-000123'
        });

        await DetalleOrdenCompra.bulkCreate([
            {
                NroOrdenC: ordenCompra1.NroOrdenC,
                CodMedicamento: med1.CodMedicamento,
                descripcion: 'Paracetamol 500mg',
                cantidad: 200,
                precio: 0.30,
                montouni: 60.00
            },
            {
                NroOrdenC: ordenCompra1.NroOrdenC,
                CodMedicamento: med2.CodMedicamento,
                descripcion: 'Amoxicilina 500mg',
                cantidad: 100,
                precio: 0.80,
                montouni: 80.00
            },
            {
                NroOrdenC: ordenCompra1.NroOrdenC,
                CodMedicamento: med3.CodMedicamento,
                descripcion: 'Vitamina C 1000mg',
                cantidad: 150,
                precio: 0.50,
                montouni: 75.00
            }
        ]);

        const ordenCompra2 = await OrdenCompra.create({
            fechaEmision: new Date('2025-10-05'),
            Situacion: 'pendiente',
            Total: 240.00,
            CodLab: lab2.CodLab,
            NrofacturaProv: 'F002-000456'
        });

        await DetalleOrdenCompra.bulkCreate([
            {
                NroOrdenC: ordenCompra2.NroOrdenC,
                CodMedicamento: med4.CodMedicamento,
                descripcion: 'Ibuprofeno 400mg',
                cantidad: 100,
                precio: 0.50,
                montouni: 50.00
            },
            {
                NroOrdenC: ordenCompra2.NroOrdenC,
                CodMedicamento: med5.CodMedicamento,
                descripcion: 'Jarabe para la tos',
                cantidad: 50,
                precio: 2.50,
                montouni: 125.00
            }
        ]);
        console.log(`   ✅ 2 órdenes de compra con detalles insertadas\n`);

        // ==========================================
        // 7. ORDEN DE VENTA (con detalles)
        // ==========================================
        console.log('💰 Insertando órdenes de venta...');
        const ordenVenta1 = await OrdenVenta.create({
            fechaEmision: new Date('2025-10-06'),
            Motivo: 'Venta mostrador - Cliente regular',
            Situacion: 'completada'
        });

        await DetalleOrdenVta.bulkCreate([
            {
                NroOrdenVta: ordenVenta1.NroOrdenVta,
                CodMedicamento: med1.CodMedicamento,
                descripcionMed: 'Paracetamol 500mg',
                cantidadRequerida: 2
            },
            {
                NroOrdenVta: ordenVenta1.NroOrdenVta,
                CodMedicamento: med3.CodMedicamento,
                descripcionMed: 'Vitamina C 1000mg',
                cantidadRequerida: 1
            }
        ]);

        const ordenVenta2 = await OrdenVenta.create({
            fechaEmision: new Date('2025-10-07'),
            Motivo: 'Venta con receta médica',
            Situacion: 'pendiente'
        });

        await DetalleOrdenVta.bulkCreate([
            {
                NroOrdenVta: ordenVenta2.NroOrdenVta,
                CodMedicamento: med2.CodMedicamento,
                descripcionMed: 'Amoxicilina 500mg',
                cantidadRequerida: 1
            },
            {
                NroOrdenVta: ordenVenta2.NroOrdenVta,
                CodMedicamento: med6.CodMedicamento,
                descripcionMed: 'Ceftriaxona 1g',
                cantidadRequerida: 2
            }
        ]);
        console.log(`   ✅ 2 órdenes de venta con detalles insertadas\n`);

        // ==========================================
        // RESUMEN FINAL
        // ==========================================
        console.log('═══════════════════════════════════════════');
        console.log('🎉 ¡SEMbrado de datos completado con éxito!');
        console.log('═══════════════════════════════════════════\n');
        console.log('📊 Resumen:');
        console.log('   👥 3 usuarios (admin, moderador, usuario)');
        console.log('   🏭 3 laboratorios');
        console.log('   💊 4 especialidades');
        console.log('   💊 4 tipos de medicamentos');
        console.log('   💊 6 medicamentos');
        console.log('   🛒 2 órdenes de compra');
        console.log('    2 órdenes de venta\n');
        console.log('🔐 Credenciales de prueba:');
        console.log('   Admin:       admin@farmacia.com / 123456');
        console.log('   Moderador:   mod@farmacia.com / 123456');
        console.log('   Usuario:     user@farmacia.com / 123456\n');
        console.log('═══════════════════════════════════════════\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error en el seeder:', error);
        console.error('Detalles:', error.message);
        process.exit(1);
    }
}

sembrar();