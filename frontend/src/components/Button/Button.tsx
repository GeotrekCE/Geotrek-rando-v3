import styled, { css } from 'styled-components';
import { borderRadius, colorPalette, oldGetSpacing, typography } from 'stylesheet';

const Button = styled.button`
  padding: ${oldGetSpacing(2)} ${oldGetSpacing(4)};
  ${typography.bold}
  cursor: ${props => (props.disabled === true ? 'default' : 'pointer')};
  ${props =>
    props.disabled === true &&
    css`
      pointer-events: none;
    `}

  border: none;
  border-radius: ${borderRadius.medium};

  text-decoration: none;

  color: ${colorPalette.white};
  background-color: ${props =>
    props.disabled === true ? colorPalette.greyLight : colorPalette.amberDark};
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${props =>
      props.disabled === true ? colorPalette.greyLight : colorPalette.amber};
  }
`;

export default Button;
