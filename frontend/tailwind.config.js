const SPACING_UNIT = 4;

module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      desktop: '640px',
    },
    spacing: {
      0: '0',
      1: `${SPACING_UNIT}px`,
      2: `${SPACING_UNIT * 2}px`,
      3: `${SPACING_UNIT * 3}px`,
      4: `${SPACING_UNIT * 4}px`,
      5: `${SPACING_UNIT * 5}px`,
      6: `${SPACING_UNIT * 6}px`,
      8: `${SPACING_UNIT * 8}px`,
      10: `${SPACING_UNIT * 10}px`,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
