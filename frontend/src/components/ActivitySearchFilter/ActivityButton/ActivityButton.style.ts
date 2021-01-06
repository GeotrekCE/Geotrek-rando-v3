import styled from 'styled-components';
import { colorPalette, getSpacing, typography } from 'stylesheet';
import { buttonCssResets } from 'services/cssHelpers';

export const ActivityButtonContainer = styled.button`
  ${buttonCssResets}

  display: flex;
  flex-direction: column;
  align-items: center;

  /* We do a mix of padding and margin to have a pretty hover, padding + margin should add up to 6 */
  padding: ${getSpacing(2)} ${getSpacing(5)};
  margin: ${getSpacing(4)} ${getSpacing(1)};

  color: ${colorPalette.greyDarkColored};

  background-color: ${colorPalette.white};
  transition: background-color 150ms;

  &:hover {
    color: ${colorPalette.primary3};
  }
`;

export const Text = styled.span`
  ${typography.main}
  color: ${colorPalette.greyDarkColored};

  margin-top: ${getSpacing(2)};

  /*
    Will probably be replaced to be responsive
    width should be on the text so that the spaces work well
  */
  width: 95px;
`;
