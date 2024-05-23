import { css, FlattenSimpleInterpolation } from 'styled-components';
import { optimize } from 'svgo/lib/svgo';

import tailwindConfig from '../tailwind.config';
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

const MEASUREMENT_UNIT = 'px';
export const SPACING_UNIT = 4;
export const getSpacing = (multiplier: number): string =>
  `${multiplier * SPACING_UNIT}${MEASUREMENT_UNIT}`;
/**
 * Use this palette in your components
 * If a new color is in the mockups, check with the designer
 * that the project really need a new color and add it here.
 * As to naming, the best name is the name used by the designer
 */
export const colorPalette = {
  primary1: tailwindConfig.theme.extend.colors.primary1.DEFAULT,
  primary2: tailwindConfig.theme.extend.colors.primary2,
  warning: tailwindConfig.theme.extend.colors.warning,
  easyOK: tailwindConfig.theme.extend.colors.easyOK,
  hardKO: tailwindConfig.theme.extend.colors.hardKO,
  primary3: tailwindConfig.theme.extend.colors.primary3,
  greyDarkColored: tailwindConfig.theme.extend.colors.greyDarkColored,
  red: tailwindConfig.theme.extend.colors.red,
  greySoft: tailwindConfig.theme.extend.colors.greySoft,
  black: tailwindConfig.theme.extend.colors.black,
  white: tailwindConfig.theme.extend.colors.white,
  redMarker: tailwindConfig.theme.extend.colors.redMarker,
  blackTransparent: tailwindConfig.theme.extend.colors.blackTransparent,
  darkPurple: tailwindConfig.theme.extend.colors.greyDarkColored,
  blackSemiTransparent: tailwindConfig.theme.extend.colors.blackSemiTransparent,
  primary1_light: tailwindConfig.theme.extend.colors.primary1.light,
  filter: {
    background: tailwindConfig.theme.extend.colors.white,
    color: tailwindConfig.theme.extend.colors.black,
    borderColor: tailwindConfig.theme.extend.colors.primary1.DEFAULT,
    hover: {
      background: tailwindConfig.theme.extend.colors.primary2,
      color: tailwindConfig.theme.extend.colors.black,
    },
    selected: {
      background: tailwindConfig.theme.extend.colors.primary2,
      color: tailwindConfig.theme.extend.colors.black,
    },
    placeholder: {
      color: tailwindConfig.theme.extend.colors.greyDarkColored,
    },
  },
  home: {
    activity: {
      color: tailwindConfig.theme.extend.colors.greyDarkColored,
    },
    gradientOnImages: tailwindConfig.theme.extend.colors.gradientOnImages,
    shadowOnImages: tailwindConfig.theme.extend.colors.gradientOnImages,
  },
} as const;

// This function collects in a list all the colors defined at the root of the color palette object. Duplicated colors are eliminated.
// This list can then be used to attribute a different color to each member of a set
// It is used in sensitiveAreas for example
export const getListOfColorsInPalette = Object.keys(colorPalette).reduce<string[]>(
  (colorList, currentColor) => {
    if (typeof currentColor === 'string' && !colorList.includes(currentColor)) {
      colorList.push(currentColor);
    }
    return colorList;
  },
  [],
);

export const fontFamily = {
  main: `'Assistant', 'Helvetica', 'Arial', sans-serif`,
  code: 'Monospace',
} as const;

export const shadow = {
  large: `0 0 30px 0 rgba(0, 0, 0, 0.15)`,
  medium: '0 0 20px rgba(0, 0, 0, 0.15)',
  small: `0 0 4px ${colorPalette.greySoft.light}`,
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
    font-size: 44px;
    line-height: 58px;
  `,
  h2: css`
    font-family: ${fontFamily.main};
    font-weight: bold;
    font-size: 32px;
    line-height: 42px;
  `,
  h3: css`
    font-family: ${fontFamily.main};
    font-weight: bold;
    font-size: 24px;
    line-height: 31px;
  `,
  h4: css`
    font-family: ${fontFamily.main};
    font-weight: bold;
    font-size: 20px;
    line-height: 26px;
  `,
  code: css`
    font-family: ${fontFamily.code};
    color: ${colorPalette.primary3};
  `,
} as const;

export const borderRadius = {
  medium: '4px',
  squareButton: '8px',
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
  detailsHeaderDesktop: 56,
  coverDetailsDesktop: 550,
  topIconsDetailsDesktop: 72,
  scrollOffsetBeforeElement: 36,
  resultCardDesktop: 224,
  resultCardMobile: '27vh',
  headerAndFilterbar: 168,
};

export const scrollBar = {
  root: css`
    height: ${getSpacing(2)};
    ${desktopOnly(css`
      width: ${getSpacing(2)};
    `)}
  `,
  thumb: css`
    background-color: ${colorPalette.greySoft};
    opacity: 0.7;
    border-radius: ${getSpacing(2)};
  `,
} as const;
export const optimizeSVG = (svg: string): string => {
  const { data } = optimize(svg, {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            inlineStyles: {
              onlyMatchedOnce: false,
            },
            removeViewBox: false,
          },
        },
      },
      {
        name: 'convertStyleToAttrs',
      },
    ],
  });
  return data;
};

export const optimizeAndDefineColor =
  (color = 'currentColor') =>
  (svg: string): string => {
    const optimizedSVG = optimizeSVG(svg);

    const svgNodesWithoutFillOrStrokeAttributes = /<(?!svg|g|\/)(?![^>]*\b(fill|stroke)\b)[^>]*>/g;

    return optimizedSVG
      .replace(svgNodesWithoutFillOrStrokeAttributes, (match, p1, offset, string) => {
        if (offset > 0) {
          return match.replace('/>', `fill="${color}"/>`);
        }
        return string;
      })
      .replace(/(fill|stroke)="(?!none|transparent).*?"/gi, `$1="${color}"`);
  };
