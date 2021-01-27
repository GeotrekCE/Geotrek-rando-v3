import { DivIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

const markerHeight = 44;
const markerWidth = 36;
// We emulate a padding on the pictogram by centering it thanks to the "horizontal padding"
const markerHorizontalPadding = 6;
const markerTopPadding = 7;

const ActivityMarker: React.FC<{ pictogramUrl: string }> = ({ pictogramUrl }) => {
  return (
    <div className="relative">
      <img src="/icons/active-map-marker.svg" className="absolute" />
      <img
        src={pictogramUrl}
        className="absolute"
        style={{
          width: markerWidth - 2 * markerHorizontalPadding,
          height: 'auto',
          left: markerHorizontalPadding,
          top: markerTopPadding,
        }}
      />
    </div>
  );
};

export const TrekMarker = (pictogramUrl: string) =>
  new DivIcon({
    iconSize: [markerHeight, markerWidth],
    // point of the icon which will correspond to marker's location
    iconAnchor: [markerWidth / 2, markerHeight], // horizontal middle of the icon and bottom of it
    html: renderToStaticMarkup(<ActivityMarker pictogramUrl={pictogramUrl} />),
    className: 'bg-none border-none',
  });
