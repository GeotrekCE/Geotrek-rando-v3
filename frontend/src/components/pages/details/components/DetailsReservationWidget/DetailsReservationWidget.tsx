import { Reservation } from 'modules/details/interface';
import { useCallback, useEffect } from 'react';
import Script from 'next/script';
import Head from 'next/head';
import { useRouter } from 'next/router';

declare global {
  interface Window {
    AllianceReseaux?: any;
    eitinerance?: any;
  }
}
interface DetailsReservationWidgetProps {
  id: string;
  reservation: Reservation;
  language: string;
}
const waitForGlobal = async (key: string) => {
  return new Promise(resolve => {
    if (key in window) {
      resolve(true);
    } else {
      // eslint-disable-next-line
      setTimeout(() => {
        return waitForGlobal(key);
      }, 100);
    }
  });
};
export const DetailsReservationWidget: React.FC<DetailsReservationWidgetProps> = ({
  id,
  reservation: { partner, project },
  language,
}) => {
  const { asPath } = useRouter();
  const layer = {
    map: { lib: 'MapLeafletDevice' },
    langue: language,
    partner,
    routeId: id,
    routePage: asPath,
  };

  const onLoad = useCallback(() => {
    (core => {
      void waitForGlobal('eitinerance')
        .then(() => waitForGlobal('AllianceReseaux'))
        .then(() => {
          const spaClient = core.pages.getSinglePageApplicationClient({ layer });
          window.AllianceReseaux.jQuery(function () {
            spaClient.executePage();
          });
        });
    })(window?.eitinerance?.core);
  }, [id, partner, language]);

  useEffect(() => {
    // Hydratation once scripts loaded
    if (window.eitinerance !== undefined) {
      onLoad();
    }
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://eitinerancecdn.open-system.fr/widgets-eiti/core/core.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href={`https://eitinerancecdn.open-system.fr/widgets-eiti/${project}/${project}.min.css`}
          rel="stylesheet"
          type="text/css"
        />
        {/* Hide modal due to user inactivity */}
        <style>{`.osi-modal { display: none !important }`}</style>
      </Head>
      <Script src="https://gadget.open-system.fr/widgets-libs/rel/noyau-2.0.min.js" />
      <Script src="https://eitinerancecdn.open-system.fr/widgets-eiti/core/core.min.js" />
      <Script
        src={`https://eitinerancecdn.open-system.fr/widgets-eiti/${project}/${project}.min.js`}
        onLoad={() => onLoad()}
        strategy="lazyOnload"
      />
      <div className="OsItinerance OsItPartner CssCustom">
        <div id="eiti-partner"></div>
      </div>
    </>
  );
};
