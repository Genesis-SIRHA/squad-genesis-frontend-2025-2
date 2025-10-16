import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'pattern': "url('/background-sirha-degradate.svg')"
            },
            backgroundSize: {
                'pattern-size': 'cover',
            },
            backgroundOpacity: {
                '10': '0.1',
            },

            colors: {
                primary: {
                    DEFAULT: '#f45356',
                    hover: '#e73858',
                },
                'font-neutral': {
                    primary: 'var(--font-neutral-primary)',
                    secondary: 'var(--font-neutral-secondary)'
                },
            }
        },
            spacing: {
                '2px': '2px',
            },

            margin: {
                'sm': '6px',
                'md': '16px',
                'lg': '24px',
                'xl': '32px'
            },

            padding:{
                'sm': '6px',
                'md': '12px',
                'lg': '16px',
                'xl': '24px'
            },

            borderRadius:{
                'sm': '5px',
                'md': '16px',
                'lg': '24px'
            }
        },
        plugins: [],
    } satisfies Config;

export default config;