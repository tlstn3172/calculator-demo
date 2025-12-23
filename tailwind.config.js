/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#135bec',
                background: {
                    light: '#f6f6f8',
                    dark: '#101622',
                },
                surface: {
                    light: '#ffffff',
                    dark: '#192233',
                    highlight: '#232d42',
                },
                text: {
                    primary: {
                        light: '#0f172a',
                        dark: '#ffffff',
                    },
                    secondary: {
                        light: '#64748b',
                        dark: '#94a3b8',
                    },
                },
            },
            fontFamily: {
                sans: ['Space Grotesk', 'sans-serif'],
            },
            maxWidth: {
                'calculator': '448px',
            },
        },
    },
    plugins: [],
}
