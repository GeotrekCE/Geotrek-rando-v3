import { useEffect, useRef, useState } from 'react';
import Popup from 'components/Popup';
import { getGlobalConfig } from 'modules/utils/api.config';
import { getMapConfig } from 'components/Map/config';
import Loader from 'components/Loader';
import { FormattedMessage, useIntl } from 'react-intl';
import { Cross } from 'components/Icons/Cross';
import { useRouter } from 'next/router';
import { getDefaultLanguage } from 'modules/header/utills';
import { DetailsAdvice } from 'components/pages/details/components/DetailsAdvice';
import Interface from './Interface';

interface ThreeDProps {
  demURL: string;
  profileURL: string;
  onRequestClose: () => void;
  title: string;
  trekId: number;
}

interface SceneProps {
  deinit: () => void;
  init: (callback: () => void) => void;
}

export const ThreeD: React.FC<ThreeDProps> = ({
  demURL,
  profileURL,
  onRequestClose,
  title,
  trekId,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [libLoaded, setLibLoaded] = useState<boolean>(false);
  const scene = useRef<SceneProps | null>(null);
  const { messages } = useIntl();

  const router = useRouter();
  const currentLanguage = router.locale ?? getDefaultLanguage();

  const isAvailableWebGL = 'WebGLRenderingContext' in window;
  const { mapSatelliteLayers } = getMapConfig();

  const handleClose = () => {
    if (scene.current) {
      scene.current.deinit();
      scene.current = null;
    }
    onRequestClose();
  };

  useEffect(() => {
    if (window === undefined) {
      return;
    }

    // Dynamicly loads Rando3D package
    async function loadRando3D() {
      // @ts-expect-error the lib is not typed
      await import('@makina-corpus/rando3d');
      setLibLoaded(true);
    }

    void loadRando3D();
  }, [setLibLoaded]);

  useEffect(() => {
    if (window?.Rando3D === undefined || !libLoaded || !isAvailableWebGL) {
      return;
    }

    const customSettings = {
      IMAGES_FOLDER: '/images/3d/',
      DEM_URL: demURL,
      PROFILE_URL: profileURL,
      POI_URL: `${
        getGlobalConfig().apiUrl
      }/poi/?trek=${trekId}&language=${currentLanguage}&format=geojson`,
      TILE_TEX_URL: mapSatelliteLayers && mapSatelliteLayers[0].url,
      SIDE_TEX_URL: '/images/3d/side.jpg',
      CAM_SPEED_F: 100,
      PICTO_PREFIX: '',
      TREK_COLOR: {
        R: 0.6,
        V: 0.1,
        B: 0.1,
      },
      NO_DESCRIPTION_MESSAGE: messages['rando3D.poi.no-descriptions'],
      CAMERA_MESSAGES: {
        bird: messages['rando3D.views.bird.description'],
        examine: messages['rando3D.views.examine.description'],
        hiker: messages['rando3D.views.hiker.description'],
      },
      MODE: {
        bird: {
          enabled: false,
        },
        hiker: {
          enabled: false,
        },
      },
    };

    if (scene.current !== null) {
      scene.current.deinit();
      scene.current = null;
    }

    const app3D = window.Rando3D();
    scene.current = app3D.init(customSettings, canvasRef.current, 'examine');
    scene.current?.init(() => setLoading(false));
  }, [
    currentLanguage,
    demURL,
    isAvailableWebGL,
    mapSatelliteLayers,
    messages,
    libLoaded,
    profileURL,
    trekId,
  ]);

  const noWebGL = messages['rando3D.warning.noWebGl'] as string;

  return (
    <Popup onClose={handleClose} title={title}>
      {!isAvailableWebGL && <DetailsAdvice text={noWebGL} />}
      {isAvailableWebGL && (
        <div className="relative w-[90vw] h-[90vh] relative text-white bg-greyDarkColored bg-gradient-to-t from-sky-950 to-cyan-600 overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 bg-white/20">
              <Loader />
            </div>
          )}
          <Interface />
          <canvas className="size-full overflow-hidden border-0" ref={canvasRef} />
          <div className="poi_side absolute flex flex-col top-0 -left-100 w-100 bg-black/70 h-full transition [&.opened]:translate-x-100">
            <button type="button" className="close_btn m-2 flex items-center self-end">
              <Cross size={20} aria-hidden />
              <FormattedMessage id={'details.close'} />
            </button>
            <h2 className="text-xl text-center my-3" />
            <div className="description m-3" />
          </div>
          <div className="poi poi--clicked bg-white/20 absolute size-auto p-1 rounded-md text-center hidden z-10" />
          <div className="poi poi--hover bg-white/20 absolute size-auto p-1 rounded-md text-center hidden z-10" />
        </div>
      )}
    </Popup>
  );
};
