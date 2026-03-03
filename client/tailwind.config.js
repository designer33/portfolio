/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#3B82F6',
                    DEFAULT: '#2563EB',
                    dark: '#1D4ED8',
                },
                background: {
                    light: '#f8fafc',
                    dark: '#0f172a',
                },
                accent: '#38bdf8', // Soft neon blue
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                blob: "blob 7s infinite",
            },
            keyframes: {
                blob: {
                    "0%": { transform: "translate(0px, 0px) scale(1)" },
                    "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                    "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                    "100%": { transform: "translate(0px, 0px) scale(1)" },
                }
            }
        },
    },
    darkMode: 'class',
    plugins: [],
}
