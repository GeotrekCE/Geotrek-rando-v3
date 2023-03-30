import { TrekChildrenMarker } from 'components/Icons/TrekChildrenMarker';
import { DivIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { colorPalette, SPACING_UNIT } from 'stylesheet';

const markerHeight = 44;
const markerWidth = 36;
// We emulate a padding on the pictogram by centering it thanks to the "horizontal padding"
const markerHorizontalPadding = 6;
const markerTopPadding = 8;

const ChildMarker: React.FC<{ label: string; zoomRatio: number; color: string }> = ({
  label,
  zoomRatio,
  color,
}) => {
  const width = `w-${
    (markerWidth / SPACING_UNIT - 2 * (markerHorizontalPadding / SPACING_UNIT)) * zoomRatio
  }`;
  const top = `top-${(markerTopPadding / SPACING_UNIT) * zoomRatio}`;
  const fontSize = zoomRatio === 1 ? 'text-xl' : 'text-2xl';
  return (
    <div className="relative flex justify-center">
      <TrekChildrenMarker color={color ?? colorPalette.primary1} size={markerWidth * zoomRatio} />
      <span
        className={`absolute z-leafletSvg text-primary font-bold text-center leading-5 ${width} ${top} ${fontSize}`}
      >
        {label}
      </span>
    </div>
  );
};

export const TrekChildMarker = (rank: number, zoomRatio = 1, color: string): DivIcon =>
  new DivIcon({
    iconSize: [markerHeight * zoomRatio, markerWidth * zoomRatio],
    // point of the icon which will correspond to marker's location
    iconAnchor: [(markerWidth * zoomRatio) / 2, markerHeight * zoomRatio], // horizontal middle of the icon and bottom of it
    html: renderToStaticMarkup(
      <ChildMarker label={`${rank}`} zoomRatio={zoomRatio} color={color} />,
    ),
    className: 'bg-none border-none',
  });
