// Gestión de temas
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

// Inicializar el gestor de temas
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});