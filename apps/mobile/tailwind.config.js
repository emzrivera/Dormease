/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
        fontFamily: {
    "figtree-regular": ["Figtree_400Regular"],
    "figtree-medium": ["Figtree_500Medium"],
    "figtree-semibold": ["Figtree_600SemiBold"],
    "figtree-bold": ["Figtree_700Bold"],
    "figtree-extrabold": ["Figtree_800ExtraBold"],
    "figtree-black": ["Figtree_900Black"],

    "montserrat-regular": ["Montserrat_400Regular"],
    "montserrat-medium": ["Montserrat_500Medium"],
    "montserrat-semibold": ["Montserrat_600SemiBold"],
    "montserrat-bold": ["Montserrat_700Bold"],
    "montserrat-extrabold": ["Montserrat_800ExtraBold"],
    "montserrat-black": ["Montserrat_900Black"],
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
    },
  },
  plugins: [],
};
