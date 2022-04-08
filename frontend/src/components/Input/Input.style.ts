import styled from 'styled-components';
import { borderRadius, colorPalette, oldGetSpacing, typography } from 'stylesheet';

const getBorderColor = (hasError = false, originalColor: string): string =>
  hasError ? colorPalette.hardKO : originalColor;

interface Props {
  hasError?: boolean;
}

const Input = styled.input<Props>`
  ${typography.main}
  width: 100%;
  height: 60px;
  background-color: ${colorPalette.white};
  padding: 0 ${oldGetSpacing(3)};
  border-radius: ${borderRadius.medium};
  border: 1px solid ${props => getBorderColor(props.hasError, colorPalette.greySoft.DEFAULT)};

  :hover {
    border-color: ${props => getBorderColor(props.hasError, colorPalette.greyDarkColored)};
  }

  :focus {
    border-color: ${props => getBorderColor(props.hasError, colorPalette.primary1)};
  }

  ::placeholder {
    color: ${colorPalette.greySoft};
  }

  &[readonly],
  &[disabled] {
    background-color: ${colorPalette.greySoft.DEFAULT};
    cursor: not-allowed;
    :hover {
      border-color: ${props => getBorderColor(props.hasError, colorPalette.greySoft.DEFAULT)};
    }
  }
`;
Input.displayName = 'Input';

export default Input;
