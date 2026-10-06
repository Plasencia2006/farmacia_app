// public/js/auth.js

// ✅ Usar var y exponer globalmente para evitar conflictos
var API = '/api';
window.API = API;

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
            document.cookie = `token=${res.data.token}; max-age=28800; path=/`;
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
            document.getElementById('errorPassword').textContent = '❌ Mínimo 6 caracteres';
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
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'token=; Max-Age=0; path=/;';
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    window.location.href = '/login';
};