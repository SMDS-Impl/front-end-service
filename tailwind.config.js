module.exports = {
    darkMode: 'class',
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './app/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                primary: ['Circular XX TT', 'sans-serif'],
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
