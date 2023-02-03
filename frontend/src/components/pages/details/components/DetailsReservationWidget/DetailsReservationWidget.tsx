import { Reservation } from 'modules/details/interface';
import { useCallback, useEffect } from 'react';
import Loader from 'components/Loader';
import Script from 'next/script';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useHasMounted from 'hooks/useHasMounted';

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
  const isMounted = useHasMounted();

  const onLoad = useCallback(() => {
    const layer = {
      map: { lib: 'MapLeafletDevice' },
      langue: language,
      partner,
      routeId: id,
      routePage: asPath,
    };
    (core => {
      void waitForGlobal('eitinerance')
        .then(() => waitForGlobal('AllianceReseaux'))
        .then(() => {
          const spaClient = core.pages?.getSinglePageApplicationClient({ layer });
          window.AllianceReseaux.jQuery(function () {
            if (spaClient !== undefined) {
              spaClient.executePage();
            } else {
              onLoad();
            }
          });
        });
    })(window?.eitinerance?.core);
  }, [asPath, id, language, partner]);

  useEffect(() => {
    // Hydration once scripts loaded
    if (isMounted && window.eitinerance !== undefined) {
      onLoad();
    }
  }, [onLoad]);

  if (!isMounted) {
    return null;
  }

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
        <div id="eiti-partner">
          <Loader />
        </div>
      </div>
    </>
  );
};
