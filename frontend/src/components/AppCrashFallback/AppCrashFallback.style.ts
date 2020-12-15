import styled from 'styled-components';
import { getSpacing, typography } from 'stylesheet';
import BaseButton from 'components/Button';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;
Container.displayName = 'Container';

export const PageContent = styled.div`
  padding: ${getSpacing(8)} ${getSpacing(4)};
`;
PageContent.displayName = 'PageContent';

export const Title = styled.h1`
  ${typography.h1}
`;
Title.displayName = 'Title';

export const HelperList = styled.ul`
  list-style: disc inside;
  margin-top: ${getSpacing(2)};
`;
HelperList.displayName = 'HelperList';

export const Button = styled(BaseButton)`
  padding: ${getSpacing(1)} ${getSpacing(2)};
`;
