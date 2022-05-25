import styled, { css } from 'styled-components';
import Input from 'components/Input/Input.style';
import { borderRadius, desktopOnly, getSpacing } from 'stylesheet';

const CustomizedInput = styled(Input)`
  width: ${getSpacing(54)};
  flex-grow: 2;
  ${desktopOnly(css`
    width: ${getSpacing(58)};
  `)}
  height: ${getSpacing(10)};
  ${desktopOnly(css`
    height: ${getSpacing(12)};
  `)}
  border-radius: 0;
  border-top-left-radius: ${borderRadius.squareButton};
  border-bottom-left-radius: ${borderRadius.squareButton};
`;

export default CustomizedInput;
