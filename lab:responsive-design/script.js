// Menú hamburguesa
const burger = document.getElementById('burger');
const nav = document.querySelector('.site-nav');
burger.addEventListener('click', () => {
    nav.classList.toggle('open');
    const expanded = nav.classList.contains('open');
    burger.setAttribute('aria-expanded', expanded);
});

// Modal
const btnRegistro = document.getElementById('btnRegistro');
const modal = document.getElementById('modal');
const closeModal = document.querySelectorAll('.close, .close-modal');
const form = document.getElementById('signup');

// Abrir modal
btnRegistro.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Evita scroll
});

// Cerrar modal
closeModal.forEach((btn) => {
    btn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restaura scroll
    });
});

// Cerrar al hacer clic fuera del contenido
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// Validación del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const cp = document.getElementById('cp');

    // Validar nombre
    if (!nombre.value.trim()) {
        nombre.classList.add('error');
        ok = false;
    } else {
        nombre.classList.remove('error');
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        email.classList.add('error');
        ok = false;
    } else {
        email.classList.remove('error');
    }

    // Validar contraseña
    if (!password.value || password.value.length < 6) {
        password.classList.add('error');
        ok = false;
    } else {
        password.classList.remove('error');
    }

    // Validar CP
    if (cp.value && !/^\d{5}$/.test(cp.value)) {
        cp.classList.add('error');
        ok = false;
    } else {
        cp.classList.remove('error');
    }

    if (ok) {
        alert('¡Cuenta creada! Bienvenido.');
        form.reset();
        modal.style.display = 'none';
        document.body.style.overflow = '';
    } else {
        alert('Por favor, revisa los campos marcados.');
    }
});
