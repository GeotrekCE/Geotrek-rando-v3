import { Reservation } from 'modules/details/interface';
import { useCallback, useEffect, useState } from 'react';
import Loader from 'components/Loader';
import Script from 'next/script';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useHasMounted from 'hooks/useHasMounted';

declare global {
  interface Window {
    eitinerance?: {
      core?: {
        pages?: {
          getSinglePageApplicationClient: (prop: {
            layer: {
              map: { lib: string };
              langue: string;
              partner: string;
              routeId: string;
              routePage: string;
            };
          }) => { executePage: () => void };
        };
      };
    };
  }
}
interface DetailsReservationWidgetProps {
  id: string;
  reservation: Reservation;
  language: string;
}

export const DetailsReservationWidget: React.FC<DetailsReservationWidgetProps> = ({
  id,
  reservation: { partner, project },
  language,
}) => {
  const { asPath } = useRouter();
  const isMounted = useHasMounted();
  const [stepsLoadedScript, setStepsLoadedScript] = useState<number>(0);

  const onLoad = useCallback(() => {
    const layer = {
      map: { lib: 'MapLeafletDevice' },
      langue: language,
      partner,
      routeId: id,
      routePage: asPath,
    };
    const spaClient = window?.eitinerance?.core?.pages?.getSinglePageApplicationClient({ layer });
    spaClient?.executePage();
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
      <Script
        src="https://gadget.open-system.fr/widgets-libs/rel/noyau-2.0.min.js"
        onLoad={() => setStepsLoadedScript(1)}
      />
      {stepsLoadedScript > 0 && (
        <Script
          src="https://eitinerancecdn.open-system.fr/widgets-eiti/core/core.min.js"
          onLoad={() => setStepsLoadedScript(2)}
        />
      )}
      {stepsLoadedScript > 1 && (
        <Script
          src={`https://eitinerancecdn.open-system.fr/widgets-eiti/${project}/${project}.min.js`}
          onLoad={onLoad}
        />
      )}
      <div className="OsItinerance OsItPartner CssCustom">
        <div id="eiti-partner">
          <Loader />
        </div>
      </div>
    </>
  );
};
