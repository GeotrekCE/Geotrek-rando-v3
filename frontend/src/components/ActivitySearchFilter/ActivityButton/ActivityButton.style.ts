import styled from 'styled-components';
import { colorPalette, getSpacing, typography } from 'stylesheet';
import { buttonCssResets } from 'services/cssHelpers';

export const ActivityButtonContainer = styled.button`
  ${buttonCssResets}

  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${getSpacing(6)};
  color: ${colorPalette.greyDarkColored};

  background-color: ${colorPalette.white};
  transition: background-color 150ms;

  &:hover {
    color: ${colorPalette.primary3};
  }
`;

export const Text = styled.span`
  ${typography.small}
  color: ${colorPalette.greyDarkColored};

  margin-top: ${getSpacing(2)};
  text-overflow: ellipsis;
  overflow: hidden;

  /*
    Will probably be replaced to be responsive
    width should be on the text so that the spaces work well
  */
  width: 95px;
`;
