const SPACING_UNIT = 4;

module.exports = {
  // purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      desktop: '1024px',
    },
    boxShadow: {
      DEFAULT: '0 0 30px 0 rgba(0, 0, 0, 0.15)',
      none: 'none',
    },
    spacing: {
      0: '0',
      '1p': '1px',
      1: `${SPACING_UNIT}px`,
      1.5: `${SPACING_UNIT * 1.5}px`,
      2: `${SPACING_UNIT * 2}px`,
      2.5: `${SPACING_UNIT * 2.5}px`,
      3: `${SPACING_UNIT * 3}px`,
      3.5: `${SPACING_UNIT * 3.5}px`,
      4: `${SPACING_UNIT * 4}px`,
      5: `${SPACING_UNIT * 5}px`,
      5.5: `${SPACING_UNIT * 5.5}px`,
      6: `${SPACING_UNIT * 6}px`,
      7: `${SPACING_UNIT * 7}px`,
      8: `${SPACING_UNIT * 8}px`,
      9: `${SPACING_UNIT * 9}px`,
      10: `${SPACING_UNIT * 10}px`,
      11: `${SPACING_UNIT * 11}px`,
      12: `${SPACING_UNIT * 12}px`,
      15: `${SPACING_UNIT * 15}px`,
      18: `${SPACING_UNIT * 18}px`,
      21.5: `${SPACING_UNIT * 21.5}px`,
      30: `${SPACING_UNIT * 30}px`,
      40: `${SPACING_UNIT * 40}px`,
      50: `${SPACING_UNIT * 50}px`,
      60: `${SPACING_UNIT * 60}px`,
      90: `${SPACING_UNIT * 90}px`,
      100: `${SPACING_UNIT * 100}px`,
      filterBar: '72px',
      headerAndFilterBar: '168px',
      activitySearchFilter: '865px',
      coverDetailsDesktop: '550px',
      coverDetailsMobile: '145px',
      desktopHeader: '96px',
    },
    zIndex: {
      content: 0,
      loader: 1,
      floatingButton: 1,
      header: 2,
      sliderMenu: 3,
      map: 1000,
      mapButton: 1500,
    },
    fontSize: {
      // [fontSize, lineHeight] // fontSize in px
      H1: ['2.75rem', '58px'], // 44px
      H2: ['2rem', '42px'], // 32px
      H3: ['1.5rem', '31px'], // 24px
      H4: ['1.25rem', '26px'], // 20px
      P1: ['1rem', '21px'], // 16px [default]
      P2: ['0.875rem', '18px'], // 14px
      P3: ['0.75rem', '16px'], // 12px
      CTA: ['0,625rem', '13px'], // 10px
      'Mobile-H1': ['1.25rem', '26px'], // 20px
      'Mobile-C1': ['1rem', '21px'], // 16px [default]
      'Mobile-C2': ['0.875rem', '18px'], // 14px
      'Mobile-C3': ['0.75rem', '16px'], // 12px
      'Mobile-C1-regular': ['0.75rem', '22px'], // 12px
    },
    extend: {
      borderWidth: {
        3: '3px',
      },
      boxShadow: {
        lg: '0 0 30px 0 rgba(0, 0, 0, 0.15)',
        md: '0 0 20px rgba(0, 0, 0, 0.15)',
        sm: '0 0 4px rgba(0, 0, 0, 0.15)',
      },
      colors: {
        primary1: {
          DEFAULT: '#AA397D',
          light: '#bd3e8b',
        },
        primary2: '#F5E7EF',
        primary3: '#791150',
        greySoft: {
          DEFAULT: '#D7D6D9',
          light: '#D7D6D950',
        },
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
