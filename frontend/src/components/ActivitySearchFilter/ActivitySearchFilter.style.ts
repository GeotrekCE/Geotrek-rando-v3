import styled from 'styled-components';
import { borderRadius, colorPalette, getSpacing } from 'stylesheet';

export const ActivitySearchFilterContainer = styled.div`
  display: flex;

  padding: 0 ${getSpacing(7)};
  background-color: ${colorPalette.white};
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.15);
  border-radius: ${borderRadius.card};
`;
