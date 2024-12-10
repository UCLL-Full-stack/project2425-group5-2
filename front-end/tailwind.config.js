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
                text: '#000000',
                background: '#dbdbff',
                primary: '#9e7cdf',
                secondary: '#190fa9',
                accent: '#514dd1',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            boxShadow: {
                'heavy': '0px 10px 20px rgba(0, 0, 0, 0.3)',
              },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
