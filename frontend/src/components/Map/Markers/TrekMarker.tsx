import { DivIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import styled from 'styled-components';

import { BaseMarker } from './BaseMarker';

const markerHeight = 44;
const markerWidth = 36;
// We emulate a padding on the pictogram by centering it thanks to the "horizontal padding"
const markerHorizontalPadding = 6;
const markerTopPadding = 7;

const ActivityPictogram = styled.img`
  width: ${markerWidth - 2 * markerHorizontalPadding}px;
  height: auto;
  left: ${markerHorizontalPadding}px;
  top: ${markerTopPadding}px;
`;

const ActivityMarker: React.FC<{ pictogramUrl: string }> = ({ pictogramUrl }) => {
  return (
    <div className="relative">
      <BaseMarker className="absolute" />
      <ActivityPictogram className="absolute" src={pictogramUrl} />
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
