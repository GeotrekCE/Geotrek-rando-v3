import { Reservation } from 'modules/details/interface';
import { useEffect } from 'react';
import styled from 'styled-components';
import __html from './template.html';

const Wrapper = styled.div``;

interface DetailsReservationWidgetProps {
  id: string;
  reservation: Reservation;
  language: string;
}

declare var AllianceReseaux: any;

export const DetailsReservationWidget: React.FC<DetailsReservationWidgetProps> = ({
  id,
  reservation,
  language,
}) => {
  useEffect(() => {
    console.log('EXECUTING!');

    (function (window, ITW, undefined) {
      console.log('EXECUYTING IN !!!');
      var layer = {
        map: { lib: 'MapLeafletDevice' },
        langue: language,
        partner: reservation.partner,
        routeId: id,
      };
      var spaClient = ITW.pages.getSinglePageApplicationClient({ layer: layer });
      AllianceReseaux.jQuery(function () {
        spaClient.executePage();
      });
    })(window, (window as any).eitinerance.core);
  }, []);

  const template = { __html: __html.replace('__PROJECT__', reservation.project) };

  return (
    <Wrapper>
      <div dangerouslySetInnerHTML={template} />
    </Wrapper>
  );
};
