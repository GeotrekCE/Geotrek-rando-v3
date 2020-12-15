import styled from 'styled-components';
import { colorPalette, getSpacing, typography } from 'stylesheet';

export const Label = styled.label`
  display: block;
  ${typography.bold}
  margin-bottom: ${getSpacing(1)};
`;

export const Error = styled.p`
  color: ${colorPalette.red};
  ${typography.small}
  margin-top: ${getSpacing(1)};
`;

export const Row = styled.div`
  margin-bottom: ${getSpacing(5)};
  width: 100%;
`;
