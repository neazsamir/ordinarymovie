/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    	colors: {
    		'theme': '#e50913',
    		'darkBlue': '#012a40',
    	},
    	boxShadow: {
			'3xl': '0 2px 30px black',  
			'4xl': '0 25px 50px black',  
			'5xl': '0 30px 60px rgba(0, 0, 0, 0.5)',  
			'6xl': '0 40px 80px rgba(0, 0, 0, 0.6)',  
			'7xl': '0 50px 100px rgba(0, 0, 0, 0.7)',
    	},
    	screens: {
    	'xs': '310px',
			'sm': '445px',
      'md': '640px',
      'lg': '768px',
      'xl': '1040px',
      '2xl': '1280px',
    	},
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}