import { css, FlattenSimpleInterpolation } from 'styled-components';

/**
 * Emulates flex-gap which has yet to be implemented on every browser
 * https://coryrylan.com/blog/css-gap-space-with-flexbox
 */
export const flexGap = (gapX: string, gapY?: string): FlattenSimpleInterpolation => css`
  --gapX: ${gapX};
  --gapY: ${gapY ?? gapX};
  display: inline-flex;
  flex-wrap: wrap;
  margin: calc(-1 * var(--gapY)) 0 0 calc(-1 * var(--gapX));
  width: calc(100% + var(--gapX));

  & > * {
    margin: var(--gapY) 0 0 var(--gapX);
  }
`;

/**
 * Allows you to properly re-design a HTML button without all the defaults
 */
export const buttonCssResets = css`
  border: none;
  margin: 0;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:focus {
    outline: 0;
  }
`;

export const textEllipsisAfterNLines = (lines: number): FlattenSimpleInterpolation => css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${lines};
  overflow: hidden;
`;
