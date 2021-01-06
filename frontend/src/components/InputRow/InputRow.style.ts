import styled from 'styled-components';
import { colorPalette, oldGetSpacing, typography } from 'stylesheet';

export const Label = styled.label`
  display: block;
  ${typography.bold}
  margin-bottom: ${oldGetSpacing(1)};
`;

export const Error = styled.p`
  color: ${colorPalette.red};
  ${typography.small}
  margin-top: ${oldGetSpacing(1)};
`;

export const Row = styled.div`
  margin-bottom: ${oldGetSpacing(5)};
  width: 100%;
`;
