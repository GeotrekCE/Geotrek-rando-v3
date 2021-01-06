import styled from 'styled-components';
import { borderRadius, colorPalette, getSpacing, typography } from 'stylesheet';
import { buttonCssResets } from 'services/cssHelpers';

  ${buttonCssResets};

  padding: ${getSpacing(2)} ${getSpacing(4)};

  border: 1px solid ${colorPalette.primary1};
  border-radius: ${borderRadius.squareButton};

  ${typography.main}
  color: ${colorPalette.primary1};

  background-color: ${colorPalette.white};
  transition: background-color 0.3s ease-in-out;

  cursor: pointer;

  &:hover {
    background-color: ${colorPalette.primary2};
  }
`;

export default Button;
