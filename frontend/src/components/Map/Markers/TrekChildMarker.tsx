import { DivIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import styled from 'styled-components';
import { colorPalette, typography } from 'stylesheet';

const markerHeight = 44;
const markerWidth = 36;
// We emulate a padding on the pictogram by centering it thanks to the "horizontal padding"
const markerHorizontalPadding = 13;
const markerTopPadding = 6;

const ChildLabel = styled.span`
  color: ${colorPalette.primary1};
  ${typography.h4}
  width: ${markerWidth - 2 * markerHorizontalPadding}px;
  height: auto;
  left: ${markerHorizontalPadding}px;
  top: ${markerTopPadding}px;
  position: absolute;
`;

const ChildMarker: React.FC<{ label: string }> = ({ label }) => {
  return (
    <div className="relative">
      <img src="/icons/trek-child-map-marker.svg" className="absolute" />
      <ChildLabel>{label}</ChildLabel>
    </div>
  );
};

export const TrekChildMarker = (rank: number): DivIcon =>
  new DivIcon({
    iconSize: [markerHeight, markerWidth],
    // point of the icon which will correspond to marker's location
    iconAnchor: [markerWidth / 2, markerHeight], // horizontal middle of the icon and bottom of it
    html: renderToStaticMarkup(<ChildMarker label={`${rank}`} />),
    className: 'bg-none border-none',
  });
