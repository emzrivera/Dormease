/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],

    theme: {
        screens: {
            'xs': '475px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
            '3xl': '1920px',
        },
        extend: {
            fontFamily: {
                figtree: ['var(--font-figtree)', 'sans-serif'],
                montserrat: ['var(--font-montserrat)', 'sans-serif'],
            },
            colors: {
                darkest: '#122A60',
                dark: '#2254C5',
                light: '#0096ED',
                lightest: '#4EBEFF',
                labelGray: '#8794B2',
                labelDarkGray: '#768099',
                lightestGray: '#F8FAFD',
                white: '#FFFFFF',
                lightBorder: '#DEE6F7',
                fieldBorder: '#A7BBE8',
                warning: '#C52222',
                activeGreen: '#3E9641',
                backgroundBlue: '#E4F6FF',
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
            },
            maxWidth: {
                '8xl': '88rem',
                '9xl': '96rem',
            },
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
    ],
}