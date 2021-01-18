import React from 'react';
import styled from 'styled-components';

import { Reload } from 'components/Icons/Reload';

import { getSpacing, sizes } from 'stylesheet';
import { buttonCssResets } from 'services/cssHelpers';

export const ErrorFallback: React.FC = () => {
  return (
    <Container className="flex flex-col flex-1 items-center mt-4">
      <div className="text-H1 text-center">Une erreur est survenue</div>
      <ReloadButton className="flex flex-col items-center">
        <Reload size={48} />
        <span>Recharger</span>
      </ReloadButton>
    </Container>
  );
};

const Container = styled.div`
  margin-top: ${sizes.desktopHeader + sizes.filterBar};
`;

const ReloadButton = styled.button`
  ${buttonCssResets};
  margin-top: ${getSpacing(4)};
`;
