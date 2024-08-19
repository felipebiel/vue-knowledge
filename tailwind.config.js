/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#287bff',
                secundary: '#999',
                link: '#42b983',
                'body-color': '#f5f5f5',
            },
            boxShadow: {
                app: '0 7px 25px rgba(0, 0, 0, 0.08)',
            },
        },
    },
    plugins: [],
};
