import { css, FlattenSimpleInterpolation } from 'styled-components';

/**
 * This file is here to ensure UI consistency
 * You **MUST** sync with your designer at the start of the project to check
 * what colors/typos/grid unit you are going to use, and stick to it.
 */

// This file is where the variables are defined, so we can disable stylelint here
// stylelint-disable

export const MAX_WIDTH_MOBILE = 1024;

export const desktopOnly = (
  cssProperties: FlattenSimpleInterpolation,
): FlattenSimpleInterpolation => {
  return css`
    @media (min-width: ${MAX_WIDTH_MOBILE}px) {
      ${cssProperties}
    }
  `;
};

/**
 * App spacing measurement convention
 * Use the getSpacing function below to compute padding and margin
 * and elements with fixed width/height
 */
const OLD_SPACING_UNIT = 5;
const MEASUREMENT_UNIT = 'px';
/** @deprecated - use getSpacing instead */
export const oldGetSpacing = (multiplier: number): string =>
  `${multiplier * OLD_SPACING_UNIT}${MEASUREMENT_UNIT}`;

const SPACING_UNIT = 4;
export const getSpacing = (multiplier: number): string =>
  `${multiplier * SPACING_UNIT}${MEASUREMENT_UNIT}`;
/**
 * Use this palette in your components
 * If a new color is in the mockups, check with the designer
 * that the project really need a new color and add it here.
 * As to naming, the best name is the name used by the designer
 */
export const colorPalette = {
  primary1: '#AA397D',
  primary2: '#F5E7EF',
  primary3: '#791150',
  greyDarkColored: '#534764',
  greySoft: '#D7D6D9',
  warning: '#D77E00',
  easyOK: '#4FAD79',
  hardKO: '#E25316',
  black: '#000000',
  white: '#FFFFFF',
  red: '#FF7373',
  blackTransparent: 'rgba(0, 0, 0, 0.24)',
  darkPurple: '#534764',
  filter: {
    background: '#FFFFFF',
    color: '#000000',
    borderColor: '#AA397D',
    hover: {
      background: '#F5E7EF',
      color: '#000000',
    },
    selected: {
      background: '#F5E7EF',
      color: '#000000',
    },
    placeholder: {
      color: '#534764',
    },
  },
  home: {
    activity: {
      color: '#534764',
    },
    gradientOnImages: '#27041970',
    shadowOnImages: '#27041970',
  },
} as const;

export const fontFamily = {
  main: `'Assistant', 'Helvetica', 'Arial', sans-serif`,
  code: 'Monospace',
} as const;

export const shadow = {
  large: `0 0 30px 0 rgba(0, 0, 0, 0.15)`,
  small: `0 0 4px ${colorPalette.greySoft}`,
} as const;

export const typography = {
  main: css`
    font-family: ${fontFamily.main};
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    color: ${colorPalette.greyDarkColored};
  `,
  bold: css`
    font-weight: bold;
  `,
  light: css`
    font-weight: lighter;
  `,
  small: css`
    font-size: 14px;
    line-height: 18px;
  `,
  h1: css`
    font-family: ${fontFamily.main};
    font-weight: bold;
    font-size: 20px;
    line-height: 26px;
  `,
  h2: css`
    font-family: ${fontFamily.main};
    font-weight: bold;
    font-size: 32px;
    line-height: 42px;
  `,
  code: css`
    font-family: ${fontFamily.code};
    color: ${colorPalette.primary3};
  `,
} as const;

export const borderRadius = {
  medium: '4px',
  squareButton: '8px',
  large: '10px',
  card: '16px',
  chip: '20px',
  roundButton: '50px',
} as const;

export const zIndex = {
  content: 0,
  loader: 1,
  floatingButton: 1,
  header: 2,
  sliderMenu: 3,
} as const;

export const sizes = {
  desktopHeader: 96,
  button: 48,
  filterBar: 72,
  mobileDetailsTitle: 230,
  detailsHeaderDesktop: 55,
  coverDetailsDesktop: 550,
  topIconsDetailsDesktop: 72,
  scrollOffsetBeforeElement: 36,
};

export const fillSvgWithColor = (color: string) => (svg: string): string =>
  svg.replace(/fill:.*?;/g, `fill: ${color};`);
