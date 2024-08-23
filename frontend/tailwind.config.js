const SPACING_UNIT = 4;
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      desktop: '1024px',
    },
    fontFamily: {
      main: `'Assistant', 'Helvetica', 'Arial', sans-serif`,
      code: 'Monospace',
    },
    boxShadow: {
      DEFAULT: '0 0 30px 0 rgba(0, 0, 0, 0.15)',
      none: 'none',
    },
    spacing: {
      0: '0',
      '1p': '1px',
      '2p': '2px',
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
      13: `${SPACING_UNIT * 13}px`,
      14: `${SPACING_UNIT * 14}px`,
      15: `${SPACING_UNIT * 15}px`,
      16: `${SPACING_UNIT * 16}px`,
      18: `${SPACING_UNIT * 18}px`,
      20: `${SPACING_UNIT * 20}px`,
      21.5: `${SPACING_UNIT * 21.5}px`,
      25: `${SPACING_UNIT * 25}px`,
      30: `${SPACING_UNIT * 30}px`,
      40: `${SPACING_UNIT * 40}px`,
      50: `${SPACING_UNIT * 50}px`,
      55: `${SPACING_UNIT * 55}px`,
      58: `${SPACING_UNIT * 58}px`,
      60: `${SPACING_UNIT * 60}px`,
      70: `${SPACING_UNIT * 70}px`,
      90: `${SPACING_UNIT * 90}px`,
      100: `${SPACING_UNIT * 100}px`,
      '10vw': '10vw',
      '10percent': '10%',
      '50percent': '50%',
      filterBar: '72px',
      headerAndFilterBar: '152px',
      activitySearchFilter: '865px',
      coverDetailsDesktop: '550px',
      coverDetailsMobile: '35vh',
      desktopHeader: '96px',
      mobileHeader: '44px',
      detailsHeaderMobile: '42px',
      detailsCardSection: '700px',
      headerAndDetailsRecapBar: '149px',
      resultCardDesktop: '224px',
      resultCardMobile: '27vh',
      suggestionCardDesktop: '25vw',
      button: '48px',
      bannerSectionDesktop: '80vh',
      bannerSectionMobile: '244px',
      mobileDetailsTitle: '230px',
    },
    zIndex: {
      content: 0,
      10: 10,
      20: 20,
      leafletSvg: 200,
      text: 200,
      loader: 300,
      floatingButton: 300,
      header: 500,
      subHeader: 450,
      headerDetails: 300,
      sliderMenu: 900,
      map: 1000,
      mapButton: 1500,
    },

    extend: {
      fontSize: {
        // [fontSize, lineHeight] // fontSize in px
        H1: ['2.75rem', '58px'], // 44px
        H2: ['2rem', '42px'], // 32px
        H3: ['1.5rem', '31px'], // 24px
        H4: ['1.25rem', '26px'], // 20px
        P1: ['1rem', '21px'], // 16px [default]
        P2: ['0.875rem', '18px'], // 14px
        P3: ['0.75rem', '16px'], // 12px
        CTA: ['0.625rem', '13px'], // 10px
        'Mobile-H1': ['1.25rem', '26px'], // 20px
        'Mobile-C1': ['1rem', '21px'], // 16px [default]
        'Mobile-C2': ['0.875rem', '18px'], // 14px
        'Mobile-C3': ['0.75rem', '16px'], // 12px
        'Mobile-C1-regular': ['0.75rem', '22px'], // 12px
      },
      borderWidth: {
        3: '3px',
      },
      borderRadius: {
        button: '8px',
        chip: '20px',
        large: '10px',
        medium: '4px',
        resultCard: '16px',
        roundButton: '50px',
        squareButton: '8px',
      },
      boxShadow: {
        lg: '0 0 30px 0 rgba(0, 0, 0, 0.15)',
        md: '0 0 20px rgba(0, 0, 0, 0.15)',
        sm: '0 0 4px rgba(0, 0, 0, 0.15)',
        button: '0 0 6px rgba(0, 0, 0, 0.15)',
        inner: 'inset 0 0 12px rgba(0, 0, 0, 0.08)',
      },
      colors: {
        current: 'currentColor',
        primary1: {
          DEFAULT: 'var(--color-primary1-default)',
          light: 'var(--color-primary1-light)',
        },
        primary2: 'var(--color-primary2)',
        primary3: 'var(--color-primary3)',
        greySoft: {
          DEFAULT: 'var(--color-greySoft-default)',
          light: 'var(--color-greySoft-light)',
        },
        warning: 'var(--color-warning)',
        easyOK: 'var(--color-easyOK)',
        hardKO: 'var(--color-hardKO)',
        black: '#000000',
        white: '#FFFFFF',
        red: 'var(--color-red)',
        redMarker: 'var(--color-redMarker)',
        blackTransparent: 'rgba(0, 0, 0, 0.24)',
        blackSemiTransparent: 'rgba(0, 0, 0, 0.36)',
        blackSemiOpaque: 'rgba(0, 0, 0, 0.70)',
        greyDarkColored: '#534764',
        gradientOnImages: '#27041970',
        trek: 'var(--color-trek)',
        events: 'var(--color-events)',
        outdoor: 'var(--color-outdoor)',
        service: 'var(--color-service)',
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': value => ({ 'animation-delay': value }),
        },
        {
          values: theme('transitionDelay'),
        },
      );
    }),
  ],
};
