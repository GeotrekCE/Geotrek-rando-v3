import { HoverableMarker } from 'components/Map/components/HoverableMarker';
import { Popup } from 'components/Map/components/Popup';
import { ContentType } from 'modules/interface';
import { PopupResult } from 'modules/trekResult/interface';

interface ClickableMarkerProps {
  points: {
    location: { x: number; y: number };
    pictogramUri: string;
    id: string;
    content: PopupResult;
    type?: ContentType | null;
  }[];
}

export const ClickableMarker = ({ points, ...props }: ClickableMarkerProps) => {
  if (!points?.length) {
    return null;
  }

  return (
    <>
      {points.map(point => (
        <HoverableMarker
          key={point.id}
          id={point.id}
          position={[point.location.y, point.location.x]}
          pictogramUri={point.pictogramUri}
        >
          <Popup id={point.id} type={point.type ?? null} content={point.content} {...props} />
        </HoverableMarker>
      ))}
    </>
  );
};

export default ClickableMarker;
