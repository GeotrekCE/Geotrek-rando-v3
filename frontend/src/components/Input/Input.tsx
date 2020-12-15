import styled from 'styled-components';
import { borderRadius, colorPalette, getSpacing, typography } from 'stylesheet';

const getBorderColor = (hasError: boolean, originalColor: string): string =>
  hasError ? colorPalette.red : originalColor;

interface Props {
  hasError: boolean;
}

const Input = styled.input<Props>`
  ${typography.main}
  width: 100%;
  height: 60px;
  background-color: ${colorPalette.white};
  padding: 0 ${getSpacing(3)};
  border-radius: ${borderRadius.medium};
  border: 1px solid ${props => getBorderColor(props.hasError, colorPalette.blackTransparent)};

  :hover {
    border-color: ${props => getBorderColor(props.hasError, colorPalette.greyDark)};
  }

  :focus {
    border-color: ${props => getBorderColor(props.hasError, colorPalette.amber)};
  }

  ::placeholder {
    color: ${colorPalette.blackTransparent};
  }
`;
Input.displayName = 'Input';

export default Input;
