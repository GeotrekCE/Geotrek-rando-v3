import { MapMarker } from 'components/Icons/MapMarker';
import { DivIcon } from 'leaflet';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import styled from 'styled-components';
import { colorPalette } from 'stylesheet';

const markerHeight = 44;
const markerWidth = 36;
// We emulate a padding on the pictogram by centering it thanks to the "horizontal padding"
const markerHorizontalPadding = 6;
const markerTopPadding = 7;

const ActivityPictogram = styled.img<{ zoomRatio: number }>`
  width: ${props => (markerWidth - 2 * markerHorizontalPadding) * props.zoomRatio}px;
  top: ${props => markerTopPadding * props.zoomRatio}px;
`;

const ActivityMarker: React.FC<{ pictogramUrl?: string; zoomRatio: number; color: string }> = ({
  pictogramUrl,
  zoomRatio,
  color,
}) => {
  const icon =
    Boolean(pictogramUrl) && pictogramUrl?.[0] === '<'
      ? `data:image/svg+xml;utf8,${pictogramUrl}`
      : pictogramUrl;
  return (
    <div className="relative flex justify-center">
      <MapMarker color={color ?? colorPalette.primary1} size={markerWidth * zoomRatio} />
      <ActivityPictogram className="absolute z-leafletSvg" src={icon} zoomRatio={zoomRatio} />
    </div>
  );
};

export const TrekMarker = (pictogramUrl?: string, zoomRatio = 1, color?: string) =>
  new DivIcon({
    iconSize: [markerHeight * zoomRatio, markerWidth * zoomRatio],
    // point of the icon which will correspond to marker's location
    iconAnchor: [(markerWidth * zoomRatio) / 2, markerHeight * zoomRatio], // horizontal middle of the icon and bottom of it
    html: renderToStaticMarkup(
      <ActivityMarker pictogramUrl={pictogramUrl} zoomRatio={zoomRatio} color={color as string} />,
    ),
    className: 'bg-none border-none',
  });
