/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{html,ts}","./src/**/**/**/*.{html,ts}","./src/**/**/**/**/*.{html,ts}","./src/**/**/**/**/**/*.{html,ts}","./src/**/**/**/**/**/**/*.{html,ts}","./src/**/**/**/**/**/**/**/*.{html,ts}"],
  theme: {
    extend: {},
    
  },
  plugins: [],
  corePlugins: {
    flex: true, // This will generate the flex-* utility classes
  },
}
