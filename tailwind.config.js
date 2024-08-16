/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#287bff',
                link: '#42b983',
                'body-color': '#f5f5f5',
            },
        },
    },
    plugins: [],
};
