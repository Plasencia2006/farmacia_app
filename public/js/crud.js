// public/js/crud.js
const API = 'http://localhost:3000/api';
const token = document.cookie.split('token=')[1];
const headers = { Authorization: `Bearer ${token}` };

// ===== CATEGORÍAS =====
async function crearCategoria() {
    const nombre = document.getElementById('catNombre').value.trim();
    const descripcion = document.getElementById('catDescripcion').value.trim();
    if (!nombre) return alert('El nombre es obligatorio');

    await axios.post(`${API}/categorias`, { nombre, descripcion }, { headers });
    location.reload();
}

async function editarCategoria(id, nombre, descripcion) {
    const nuevoNombre = prompt('Nuevo nombre:', nombre);
    if (!nuevoNombre) return;
    await axios.put(`${API}/categorias/${id}`, { nombre: nuevoNombre, descripcion }, { headers });
    location.reload();
}

async function eliminarCategoria(id) {
    if (!confirm('¿Eliminar esta categoría?')) return;
    await axios.delete(`${API}/categorias/${id}`, { headers });
    location.reload();
}

// ===== PRODUCTOS =====
async function crearProducto() {
    const nombre = document.getElementById('prodNombre').value.trim();
    const precio = parseFloat(document.getElementById('prodPrecio').value);
    const stock = parseInt(document.getElementById('prodStock').value);
    const categoriaId = parseInt(document.getElementById('prodCategoria').value);

    if (!nombre || isNaN(precio) || isNaN(stock)) return alert('Completa todos los campos');

    await axios.post(`${API}/productos`, { nombre, precio, stock, categoriaId }, { headers });
    location.reload();
}

async function editarProducto(id, nombre, precio, stock, categoriaId) {
    const nuevoNombre = prompt('Nombre:', nombre);
    const nuevoPrecio = prompt('Precio:', precio);
    const nuevoStock = prompt('Stock:', stock);

    await axios.put(`${API}/productos/${id}`, {
        nombre: nuevoNombre,
        precio: parseFloat(nuevoPrecio),
        stock: parseInt(nuevoStock),
        categoriaId
    }, { headers });
    location.reload();
}

async function eliminarProducto(id) {
    if (!confirm('¿Eliminar este producto?')) return;
    await axios.delete(`${API}/productos/${id}`, { headers });
    location.reload();
}