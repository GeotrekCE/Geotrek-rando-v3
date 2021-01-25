import { css, FlattenSimpleInterpolation } from 'styled-components';
// @ts-ignore
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config.js';

const fullConfig = resolveConfig(tailwindConfig);
const { theme } = fullConfig;

/**
 * This file is here to ensure UI consistency
 * You **MUST** sync with your designer at the start of the project to check
 * what colors/typos/grid unit you are going to use, and stick to it.
 */

// This file is where the variables are defined, so we can disable stylelint here
// stylelint-disable

export const MAX_WIDTH_MOBILE = theme.screens.desktop;

export const desktopOnly = (
  cssProperties: FlattenSimpleInterpolation,
): FlattenSimpleInterpolation => {
  return css`
    @media (min-width: ${MAX_WIDTH_MOBILE}) {
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
  primary1: theme.colors.primary1,
  primary2: theme.colors.primary2,
  primary3: theme.colors.primary3,
  greyDarkColored: theme.colors.greyDarkColored,
  greySoft: theme.colors.greySoft,
  warning: theme.colors.warning,
  easyOK: theme.colors.easyOK,
  hardKO: theme.colors.hardKO,
  black: theme.colors.black,
  white: theme.colors.white,
  red: theme.colors.red,
  blackTransparent: theme.colors.blackTransparent,
  darkPurple: theme.colors.greyDarkColored,
  filter: {
    background: theme.colors.white,
    color: theme.colors.black,
    borderColor: theme.colors.primary1,
    hover: {
      background: theme.colors.primary2,
      color: theme.colors.black,
    },
    selected: {
      background: theme.colors.primary2,
      color: theme.colors.black,
    },
    placeholder: {
      color: theme.colors.greyDarkColored,
    },
  },
  home: {
    activity: {
      color: theme.colors.greyDarkColored,
    },
    gradientOnImages: theme.colors.darkTransparent,
    shadowOnImages: theme.colors.darkTransparent,
  },
} as const;

export const fontFamily = {
  main: theme.fontFamily.main,
  code: theme.fontFamily.code,
} as const;

export const shadow = {
  large: theme.boxShadow.lg,
  small: theme.boxShadow.sm,
} as const;

export const typography = {
  main: css`
    font-family: ${fontFamily.main};
    font-weight: ${theme.fontWeight.normal};
    font-size: ${theme.fontSize.P1[0]};
    line-height: ${theme.fontSize.P1[1]};
    color: ${colorPalette.greyDarkColored};
  `,
  bold: css`
    font-weight: ${theme.fontWeight.bold};
  `,
  light: css`
    font-weight: ${theme.fontWeight.light};
  `,
  small: css`
    font-size: ${theme.fontSize.P2[0]};
    line-height: ${theme.fontSize.P2[1]};
  `,
  h1: css`
    font-weight: ${theme.fontWeight.bold};
    font-size: ${theme.fontSize.H1[0]};
    line-height: ${theme.fontSize.H1[1]};
  `,
  h2: css`
    font-weight: ${theme.fontWeight.bold};
    font-size: ${theme.fontSize.H2[0]};
    line-height: ${theme.fontSize.H2[1]};
  `,
  code: css`
    font-family: ${fontFamily.code};
    color: ${colorPalette.primary3};
  `,
} as const;

export const borderRadius = {
  ...theme.borderRadius,
} as const;

export const zIndex = {
  ...theme.zIndex,
} as const;

export const sizes: { [key: string]: string } = {
  ...theme.spacing,
} as const;

export const fillSvgWithColor = (color: string) => (svg: string): string =>
  svg.replace(/fill:.*?;/g, `fill: ${color};`);
