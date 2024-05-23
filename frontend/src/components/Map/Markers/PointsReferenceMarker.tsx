import { DivIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

const PointsReference: React.FC<{ number: number }> = ({ number }) => {
  return (
    <div className="size-7 rounded-full bg-redMarker grid place-items-center text-white">
      <span>{number}</span>
    </div>
  );
};

export const PointsReferenceMarker = (id: number): DivIcon =>
  new DivIcon({
    iconSize: [26, 26],
    // point of the icon which will correspond to marker's location
    iconAnchor: [13, 13], // horizontal middle of the icon and bottom of it,
    html: renderToStaticMarkup(<PointsReference number={id} />),
    className: 'bg-none border-none',
  });
