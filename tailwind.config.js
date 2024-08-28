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
                'overlayer-content': '0 7px 14px 0 rgba(0, 0, 0, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.07)',
            },
            zIndex: {
                hide: -1,
                auto: 'auto',
                base: '0',
                docked: '10',
                dropdown: '1000',
                sticky: '1100',
                banner: '1200',
                overlay: '1300',
                modal: '1400',
                popover: '1500',
                skipLink: '1600',
                toast: '1700',
                tooltip: '1800',
            },
        },
    },
    plugins: [],
};
