import Image from 'next/image';
import { MapMarker } from 'components/Icons/MapMarker';
import { DivIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { colorPalette } from 'stylesheet';

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

const ActivityMarker: React.FC<{
  pictogramUrl?: string | null;
  zoomRatio: number;
  color: string;
}> = ({ pictogramUrl, zoomRatio, color }) => {
  const icon =
    Boolean(pictogramUrl) && pictogramUrl?.[0] === '<'
      ? `data:image/svg+xml;utf8,${pictogramUrl}`
      : pictogramUrl;

  const width = getWidth(zoomRatio);
  const top = getTop(zoomRatio);
  return (
    <div className="relative flex justify-center">
      <MapMarker color={color ?? colorPalette.primary1} size={markerWidth * zoomRatio} />
      {icon && (
        <Image
          alt=""
          className={`absolute z-leafletSvg ${width} ${top}`}
          loading="lazy"
          src={icon}
          width={markerWidth * zoomRatio}
          height={markerWidth * zoomRatio}
        />
      )}
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
