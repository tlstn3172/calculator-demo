// Import styles
import '../styles/index.css';

// Main application entry point
console.log('Calculator app initialized');

// TODO: Initialize components after implementation
// import Calculator from './calculator/Calculator.js';
// import StateManager from './state/StateManager.js';
// import Display from './ui/Display.js';
// import ButtonHandler from './ui/ButtonHandler.js';
// import ThemeManager from './ui/ThemeManager.js';

// Temporary: Add dark mode toggle for testing
document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;

    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        html.classList.add('dark');
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (e.matches) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    });
});
