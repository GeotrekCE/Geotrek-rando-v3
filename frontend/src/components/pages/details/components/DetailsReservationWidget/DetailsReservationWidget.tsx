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

declare let AllianceReseaux: any;

export const DetailsReservationWidget: React.FC<DetailsReservationWidgetProps> = ({
  id,
  reservation,
  language,
}) => {
  useEffect(() => {
    (function (window, ITW) {
      const layer = {
        map: { lib: 'MapLeafletDevice' },
        langue: language,
        partner: reservation.partner,
        routeId: id,
      };

      if(ITW){
        const spaClient = ITW.pages.getSinglePageApplicationClient({ layer });
        AllianceReseaux.jQuery(function () {
          spaClient.executePage();
        });
      }
    })(window, (window as any)?.eitinerance?.core);
  }, []);

  const template = { __html: __html.replaceAll('__PROJECT__', reservation.project) };

  return (
    <Wrapper>
      <div dangerouslySetInnerHTML={template} />
    </Wrapper>
  );
};
