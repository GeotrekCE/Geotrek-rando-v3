import { Button } from 'components/Button';
import InputRow from 'components/InputRow';
import TextareaRow from 'components/TextareaRow';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Loader from 'react-loader';

import { SelectableDropdown } from 'components/pages/search/components/FilterBar/SelectableDropdown';
import useReport from 'components/Report/useReport';
import { Option } from '../../modules/filters/interface';
import { PointGeometry } from '../../modules/interface';
import Popup from 'components/Popup';
import styled from 'styled-components';
import { DetailsReservationWidget } from 'components/pages/details/components/DetailsReservationWidget';

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  height: 70vh;
  width: 70vw;
`;
interface Props {
  onRequestClose: () => void;
  id: string;
}

const Reservation: React.FC<Props> = ({ onRequestClose, id }) => {
  return (
    <Popup>
      <Wrapper>
        <DetailsReservationWidget id={id} />
        <Button onClick={onRequestClose}>
          <FormattedMessage id={'reservation.cancel'} />
        </Button>
      </Wrapper>
    </Popup>
  );
};

export default Reservation;
