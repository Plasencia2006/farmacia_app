// public/js/auth.js

// ❌ ANTES (esto causaba el error):
// const API = 'http://localhost:3000/api';

// ✅ AHORA (URL relativa - funciona en localhost Y en Render):
const API = '/api';

// Validación en el front-end
function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// LOGIN
const formLogin = document.getElementById('formLogin');
if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Limpiar errores previos
        document.getElementById('errorEmail').textContent = '';
        document.getElementById('errorPassword').textContent = '';

        let valido = true;

        if (!validarEmail(email)) {
            document.getElementById('errorEmail').textContent = ' Email inválido';
            valido = false;
        }
        if (password.length < 6) {
            document.getElementById('errorPassword').textContent = '❌ Mínimo 6 caracteres';
            valido = false;
        }
        if (!valido) return;

        try {
            const res = await axios.post(`${API}/auth/login`, { email, password });

            // Guardar token en cookie (8 horas = 28800 segundos)
            document.cookie = `token=${res.data.token}; max-age=28800; path=/`;

            // Redirigir al dashboard
            window.location.href = '/dashboard';
        } catch (err) {
            alert(err.response?.data?.mensaje || 'Error al iniciar sesión');
        }
    });
}

// REGISTRO
const formRegistro = document.getElementById('formRegistro');
if (formRegistro) {
    formRegistro.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const rol = document.getElementById('rol').value;

        // Limpiar errores previos
        document.getElementById('errorNombre').textContent = '';
        document.getElementById('errorEmail').textContent = '';
        document.getElementById('errorPassword').textContent = '';

        let valido = true;

        if (nombre.length < 3) {
            document.getElementById('errorNombre').textContent = '❌ Mínimo 3 caracteres';
            valido = false;
        }
        if (!validarEmail(email)) {
            document.getElementById('errorEmail').textContent = '❌ Email inválido';
            valido = false;
        }
        if (password.length < 6) {
            document.getElementById('errorPassword').textContent = ' Mínimo 6 caracteres';
            valido = false;
        }
        if (!valido) return;

        try {
            await axios.post(`${API}/auth/registro`, { nombre, email, password, rol });
            alert('✅ ¡Registro exitoso! Ahora inicia sesión');
            window.location.href = '/login';
        } catch (err) {
            alert(err.response?.data?.mensaje || 'Error al registrar');
        }
    });
}

// CERRAR SESIÓN
window.cerrarSesion = function () {
    console.log('🔴 Cerrando sesión...');

    // Eliminar cookie
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'token=; Max-Age=0; path=/;';

    // Limpiar localStorage
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    console.log('✅ Cookie eliminada. Redirigiendo...');

    // Redirigir al login
    window.location.href = '/login';
};