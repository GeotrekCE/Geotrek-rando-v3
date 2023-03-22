import { MapMarker } from 'components/Icons/MapMarker';
import { DivIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { colorPalette, SPACING_UNIT } from 'stylesheet';

const markerHeight = 44;
const markerWidth = 36;
// We emulate a padding on the pictogram by centering it thanks to the "horizontal padding"
const markerHorizontalPadding = 6;
const markerTopPadding = 8;

const ActivityMarker: React.FC<{ pictogramUrl?: string; zoomRatio: number; color: string }> = ({
  pictogramUrl,
  zoomRatio,
  color,
}) => {
  const icon =
    Boolean(pictogramUrl) && pictogramUrl?.[0] === '<'
      ? `data:image/svg+xml;utf8,${pictogramUrl}`
      : pictogramUrl;

  const width = `w-${
    (markerWidth / SPACING_UNIT - 2 * (markerHorizontalPadding / SPACING_UNIT)) * zoomRatio
  }`;
  const top = `top-${(markerTopPadding / SPACING_UNIT) * zoomRatio}`;
  return (
    <div className="relative flex justify-center">
      <MapMarker color={color ?? colorPalette.primary1} size={markerWidth * zoomRatio} />
      <img alt="" className={`absolute z-leafletSvg ${width} ${top}`} loading="lazy" src={icon} />
    </div>
  );
};

export const TrekMarker = (pictogramUrl?: string, zoomRatio = 1, color?: string): DivIcon =>
  new DivIcon({
    iconSize: [markerHeight * zoomRatio, markerWidth * zoomRatio],
    // point of the icon which will correspond to marker's location
    iconAnchor: [(markerWidth * zoomRatio) / 2, markerHeight * zoomRatio], // horizontal middle of the icon and bottom of it
    html: renderToStaticMarkup(
      <ActivityMarker pictogramUrl={pictogramUrl} zoomRatio={zoomRatio} color={color as string} />,
    ),
    className: 'bg-none border-none',
  });
