import { Bin } from 'components/Icons/Bin';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { colorPalette } from 'stylesheet';

interface Props {
  resultsNumber: number;
  resetFilter: () => void;
}

const MobileBottomClear: React.FC<Props> = ({ resultsNumber, resetFilter }) => {
  return (
    <BottomContainer className="shadow-lg bg-white">
      <div
        onClick={resetFilter}
        className="text-primary1 font-bold text-P2 cursor-pointer flex items-center w-1/2 justify-center"
      >
        <Bin size={12} className="mr-2" />
        <FormattedMessage id={'search.filters.clearAll'} />
      </div>

      <ClearContainer className="w-1/2">
        <FormattedMessage values={{ count: resultsNumber }} id="search.resultsFoundShort" />
      </ClearContainer>
    </BottomContainer>
  );
};

const BottomContainer = styled.div`
  display: flex !important;
  align-items: center;
  position: fixed;
  width: 80vw;
  height: 32px;
  bottom: 0;
  right: 0;
`;

const ClearContainer = styled.div`
  border-left: 1px solid ${colorPalette.greySoft.DEFAULT};
  text-align: center;
`;

export default MobileBottomClear;
