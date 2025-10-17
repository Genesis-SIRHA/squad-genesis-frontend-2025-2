/** @type {import('tailwindcss').Config} */
/* jshint esversion: 6 */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'title': ['AlexanaNeue', 'sans-serif'],
            },
            backgroundImage: {
                'pattern': "url('/src/assets/images/login-bg.jpg')",
                'customGradient': 'linear-gradient(135deg, #F26E35 0%, #F45356 50%, #E73858 100%)'
            },
            width: {
                'login-container': '30vw',
                'form-section': '20vw',
                'input-field': '10vw'
            },
            colors: {
                primary: {
                    light: '#F26E35',
                    mid: '#F45356',
                    dark: '#E73858',
                    mate: '#262626',
                    smoke: '#F2F2F2',
                },
                secondary: {
                    completed: '#59f4be',
                    cancelled: '#f45369',
                    neutral: '#d1d1d1',
                },
            },
            borderRadius: {
                '4xl': '2rem',
            },
        },
    },
    plugins: [],
};