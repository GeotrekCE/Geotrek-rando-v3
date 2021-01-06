import styled from 'styled-components';
import { oldGetSpacing, typography } from 'stylesheet';
import BaseButton from 'components/Button';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;
Container.displayName = 'Container';

export const PageContent = styled.div`
  padding: ${oldGetSpacing(8)} ${oldGetSpacing(4)};
`;
PageContent.displayName = 'PageContent';

export const Title = styled.h1`
  ${typography.h1}
`;
Title.displayName = 'Title';

export const HelperList = styled.ul`
  list-style: disc inside;
  margin-top: ${oldGetSpacing(2)};
`;
HelperList.displayName = 'HelperList';

export const Button = styled(BaseButton)`
  padding: ${oldGetSpacing(1)} ${oldGetSpacing(2)};
`;
