import { TrekFamily } from 'modules/details/interface';
import { useState } from 'react';
import { getMapConfig } from 'components/Map/config';
import { cn } from 'services/utils/cn';
import { AltimetricProfile } from '../AltimetricProfile';
import Siblings from './Siblings';

const DetailsMapDrawer: React.FC<{
  title: string;
  trekGeoJSON?: string;
  trekFamily?: TrekFamily | null;
  trekId?: number;
}> = ({ title, trekGeoJSON, trekFamily, trekId }) => {
  const { mobileMapPanelDefaultOpened } = getMapConfig();

  const [open, setOpen] = useState<boolean>(mobileMapPanelDefaultOpened);

  if (
    Boolean(trekGeoJSON) === false &&
    (!trekFamily || trekId === null || trekFamily.trekChildren.length < 2)
  ) {
    return null;
  }

  return (
    <div
      className={cn(
        'absolute bg-white inset-0 top-auto z-[1500] transition rounded-t-xl translate-y-0',
        !open && 'translate-y-[calc(100%-45px)]',
      )}
    >
      <button
        className="flex flex-col w-full items-center justify-around"
        type="button"
        onClick={e => {
          if (e.isTrusted) {
            setOpen(prevOpen => !prevOpen);
          }
        }}
      >
        <hr className="border-2 border-greySoft w-8 rounded-xl mt-2" />
        <strong className="text-base text-primary1 font-bold m-2 mt-1">{title}</strong>
      </button>
      <div className="px-2 pb-4">
        <Siblings trekFamily={trekFamily} trekId={trekId} />
        {typeof trekGeoJSON === 'string' && (
          <>
            <AltimetricProfile id="altimetric-profile-map" trekGeoJSON={trekGeoJSON} />
            <div className="h-90" id="altimetric-profile-map" />
          </>
        )}
      </div>
    </div>
  );
};

export default DetailsMapDrawer;
