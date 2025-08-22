// === Clase para gestion de tema ===
class ThemeManager {
    constructor() {
        this.toggleButton = document.getElementById('toggleTheme');
        this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.updateToggleButton();
        this.toggleButton.addEventListener('click', () => this.toggleTheme());
    }

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    getStoredTheme() {
        return localStorage.getItem('theme');
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
    }

    updateToggleButton() {
        this.toggleButton.textContent = this.currentTheme === 'dark' ? '🔆' : '🌙';
        this.toggleButton.setAttribute('aria-label', 
            this.currentTheme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'
        );
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        this.updateToggleButton();
    }
}

// Inicializacion  del gestor de temas
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();


    // === Manejo de diapositivas ===
    (function () {
        const slides = Array.from(document.querySelectorAll('.slide'));
        const overlay = document.querySelector('#indice');
        const nextBtn = document.querySelector('#next');
        const prevBtn = document.querySelector('#prev');
        const bar = document.querySelector('#bar');
        const posEl = document.querySelector('#pos');
        const totalEl = document.querySelector('#total');

        let i = 0;

        const clamp = (num, min, max) => Math.max(min, Math.min(num, max));

        function setActive(idx) {
            i = clamp(idx, 0, slides.length - 1);
            slides.forEach((s, k) => s.classList.toggle('active', k === i));
            posEl.textContent = i + 1;
            totalEl.textContent = slides.length;
            bar.style.width = (((i + 1) / slides.length) * 100).toFixed(2) + '%';

            // Proteger si no existe #indice
            if (overlay) {
                overlay.hidden = true;
                overlay.classList.remove('active');
            }
        }

        function next() { setActive(i + 1); }
        function prev() { setActive(i - 1); }

        nextBtn.addEventListener('click', next);
        prevBtn.addEventListener('click', prev);

        // === Navegación por teclado ===
        document.addEventListener('keydown', (e) => {
            // Evitar que se ejecute si el usuario está escribiendo en un input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            switch (e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                case ' ': // Barra espaciadora
                case 'PageDown':
                    e.preventDefault();
                    next();
                    break;
                
                case 'ArrowLeft':
                case 'ArrowUp':
                case 'PageUp':
                    e.preventDefault();
                    prev();
                    break;
                
                case 'Home':
                    e.preventDefault();
                    setActive(0);
                    break;
                
                case 'End':
                    e.preventDefault();
                    setActive(slides.length - 1);
                    break;
                
                case 't':
                case 'T':
                    e.preventDefault();
                    document.getElementById('toggleTheme').click();
                    break;
            }
        });

        setActive(0);
    })();

});