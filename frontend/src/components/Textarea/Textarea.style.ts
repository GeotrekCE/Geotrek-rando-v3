import styled from 'styled-components';
import { borderRadius, colorPalette, getSpacing, typography } from 'stylesheet';

const getBorderColor = (hasError = false, originalColor: string): string =>
  hasError ? colorPalette.hardKO : originalColor;

interface Props {
  hasError?: boolean;
}

const Textarea = styled.textarea<Props>`
  ${typography.main}
  width: 100%;
  height: 60px;
  background-color: ${colorPalette.white};
  padding: ${getSpacing(3)};
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
`;
Textarea.displayName = 'Textarea';

export default Textarea;
