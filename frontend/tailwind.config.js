/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      "blue-light":'#6DB9D2',
      "gray-tone":'#e5e7eb',
      "yellow-light":'#FFFF8F',
      //Xài cái dưới này nha bà
      'myBeige':'#F3F2EC', //mau background
      'myYellow':'#F9F59A',
      'myBlue':'#6DB9D2',
      'myLightYellow':'#F6F3CC',
      'myWhite':'#FFFFFF',
      'answerBlue':'#7BA8F2',
      'answerRed':'#ED7C70',
      'answerGreen':'#71C084',
      secondary: {
        100: '#E2E2D5',
        200: '#888883',
        300: '#4D4D4C',
        400: '#222222',
      },
      slate: {
        100: '#f5f5f5',
        200: '#eeeeee',
        300: '#e0e0e0',
        400: '#bdbdbd',
        500: '#9e9e9e',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
      },
      teal: {
        '50': '#edfafa',
        '100': '#d5f5f6',
        '200': '#afecef',
        '300': '#7edce2',
        '400': '#16bdca',
        '500': '#0694a2',
        '600': '#047481',
        '700': '#036672',
        '800': '#05505c',
        '900': '#014451',
      },
      gray: {
        100: '#f5f5f5',
        200: '#eeeeee',
        300: '#b3b3b3',
        400: '#a3a3a3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
      },

      blue: {
        '100': '#EBF8FF',
        '200': '#BEE3F8',
        '300': '#90CDF4',
        '400': '#63B3ED',
        '500': '#4299E1',
        '600': '#3182CE',
        '700': '#2B6CB0',
        '800': '#2C5282',
        '900': '#2A4365',
      },
    },
  },
  plugins: [],
}
