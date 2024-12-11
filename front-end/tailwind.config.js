/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './layouts/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'text': '#e1ebee',
                'background': '#001e27',
                'primary': '#9bcede',
                'secondary': '#1e677e',
                'accent': '#34b5de',
               },
               
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            boxShadow: {
                heavy: '0px 10px 20px rgba(0, 0, 0, 0.3)',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
