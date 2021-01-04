import styled, { css } from 'styled-components';
import { colorPalette, getSpacing, typography } from 'stylesheet';

/**
 * Allows you to properly re-design a HTML button without all the defaults
 */
const buttonCssResets = css`
  display: inline-block;
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

export const ActivityButtonContainer = styled.button`
  ${buttonCssResets}

  display: flex;
  flex-direction: column;
  align-items: center;

  /* We do a mix of padding and margin to have a pretty hover, padding + margin should add up to 5 */
  padding: ${getSpacing(2)} ${getSpacing(4)};
  margin: ${getSpacing(3)} ${getSpacing(1)};

  color: ${colorPalette.darkPurple};

  background-color: ${colorPalette.white};
  transition: background-color 150ms;

  &:hover {
    background-color: ${colorPalette.greyLight};
  }
`;

export const Text = styled.span`
  ${typography.main}
  color: ${colorPalette.darkPurple};

  margin-top: ${getSpacing(2)};

  /*
    Will probably be replaced to be responsive
    width should be on the text so that the spaces work well
  */
  width: 95px;
`;
