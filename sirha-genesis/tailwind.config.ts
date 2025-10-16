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
                }
            },
            spacing: {
                '2px': '2px',
            }
        },
    },
    plugins: [],
} satisfies Config;

export default config;