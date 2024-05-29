import { TrekChildrenMarker } from 'components/Icons/TrekChildrenMarker';
import { DivIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { theme } from '../../../../tailwind.config';

const markerHeight = 44;
const markerWidth = 36;

const getWidth = (ratio: number) => {
  if (ratio === 1.5) {
    return 'w-9';
  }
  if (ratio === 2) {
    return 'w-12';
  }
  return 'w-6';
};

const getTop = (ratio: number) => {
  if (ratio === 1.5) {
    return 'top-3';
  }
  if (ratio === 2) {
    return 'top-4';
  }
  return 'top-2';
};

const ChildMarker: React.FC<{ label: string; zoomRatio: number; color: string }> = ({
  label,
  zoomRatio,
  color,
}) => {
  const width = getWidth(zoomRatio);
  const top = getTop(zoomRatio);

  const fontSize = zoomRatio === 1 ? 'text-xl' : 'text-2xl';
  return (
    <div className="relative flex items-center justify-center">
      <TrekChildrenMarker
        color={color ?? theme.extend.colors.primary1.DEFAULT}
        size={markerWidth * zoomRatio}
      />
      <span
        className={`absolute z-leafletSvg text-primary font-bold text-center ${width} ${top} ${fontSize}`}
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
