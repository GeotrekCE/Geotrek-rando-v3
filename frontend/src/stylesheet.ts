import { optimize } from 'svgo/lib/svgo';

// This function collects in a list all the colors defined at the root of the color palette object. Duplicated colors are eliminated.
// This list can then be used to attribute a different color to each member of a set
// It is used in sensitiveAreas for example
export const getListOfColorsInPalette = [
  'primary1',
  'primary2',
  'warning',
  'easyOK',
  'hardKO',
  'primary3',
  'greyDarkColored',
  'red',
  'greySoft',
  'black',
  'white',
  'redMarker',
  'blackTransparent',
  'darkPurple',
  'blackSemiTransparent',
  'primary1_light',
  'filter',
  'home',
];

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
  55;
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
