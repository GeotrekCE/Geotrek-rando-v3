import { css, FlattenSimpleInterpolation } from 'styled-components';

/**
 * Emulates flex-gap which has yet to be implemented on every browser
 * https://coryrylan.com/blog/css-gap-space-with-flexbox
 */
export const flexGap = (gap: string): FlattenSimpleInterpolation => css`
  --gap: ${gap};
  display: inline-flex;
  flex-wrap: wrap;
  margin: calc(-1 * var(--gap)) 0 0 calc(-1 * var(--gap));
  width: calc(100% + var(--gap));

  & > * {
    margin: var(--gap) 0 0 var(--gap);
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
