import type { Config } from 'tailwindcss';

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'pattern': "url('/src/assets/images/login-bg.jpg')",
                'customGradient': 'linear-gradient(135deg, #F26E35 0%, #F45356 50%, #E73858 100%)'
            },
            colors: {
                primary: {
                    light: '#F26E35',
                    mid: '#F45356',
                    dark: '#E73858',
                    black: '#262626',
                    smoke: '#F2F2F2',
                },
                secondary: {
                    completed: '#59f4be',
                    cancelled: '#f45369',
                    neutral: '#d1d1d1',
                },
            },
            fontFamily: {
                sans: ['Inter var', 'sans-serif'],
            },
            spacing: {
                128: '32rem',
                144: '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
        },
    },
    plugins: [],
} satisfies Config;