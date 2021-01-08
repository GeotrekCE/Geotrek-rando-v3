const SPACING_UNIT = 4;

module.exports = {
  // purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      desktop: '640px',
    },
    boxShadow: {
      DEFAULT: '0 0 30px 0 rgba(0, 0, 0, 0.15)',
      none: 'none',
    },
    spacing: {
      0: '0',
      1: `${SPACING_UNIT}px`,
      2: `${SPACING_UNIT * 2}px`,
      2.5: `${SPACING_UNIT * 2.5}px`,
      3: `${SPACING_UNIT * 3}px`,
      3.5: `${SPACING_UNIT * 3.5}px`,
      4: `${SPACING_UNIT * 4}px`,
      5: `${SPACING_UNIT * 5}px`,
      6: `${SPACING_UNIT * 6}px`,
      8: `${SPACING_UNIT * 8}px`,
      9: `${SPACING_UNIT * 9}px`,
      10: `${SPACING_UNIT * 10}px`,
      11: `${SPACING_UNIT * 11}px`,
      12: `${SPACING_UNIT * 12}px`,
      15: `${SPACING_UNIT * 15}px`,
      18: `${SPACING_UNIT * 18}px`,
      40: `${SPACING_UNIT * 40}px`,
    },
    extend: {
      boxShadow: {
        lg: '0 0 30px 0 rgba(0, 0, 0, 0.15)',
      },
      colors: {
        primary1: '#AA397D',
        primary2: '#F5E7EF',
        primary3: '#791150',
        greySoft: '#D7D6D9',
        warning: '#D77E00',
        easyOK: '#4FAD79',
        hardKO: '#E25316',
        black: '#000000',
        white: '#FFFFFF',
        red: '#FF7373',
        blackTransparent: 'rgba(0, 0, 0, 0.24)',
        greyDarkColored: '#534764',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
