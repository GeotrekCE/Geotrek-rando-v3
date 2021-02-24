import { TrekChildrenMarker } from 'components/Icons/TrekChildrenMarker';
import { DivIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import styled from 'styled-components';
import { colorPalette, typography } from 'stylesheet';

const markerHeight = 44;
const markerWidth = 36;
// We emulate a padding on the pictogram by centering it thanks to the "horizontal padding"
const markerHorizontalPadding = 13;
const markerTopPadding = 6;

const ChildLabel = styled.span<{ zoomRatio: number }>`
  color: ${colorPalette.primary1};
  ${props => (props.zoomRatio > 1 ? typography.h3 : typography.h4)}
  width: ${props => (markerWidth - 2 * markerHorizontalPadding) * props.zoomRatio}px;
  top: ${props => markerTopPadding * props.zoomRatio}px;
  position: absolute;
  text-align: center;
`;

const ChildMarker: React.FC<{ label: string; zoomRatio: number }> = ({ label, zoomRatio }) => {
  return (
    <div className="relative flex justify-center">
      <TrekChildrenMarker color={colorPalette.primary1} size={markerWidth * zoomRatio} />
      <ChildLabel className="z-leafletSvg" zoomRatio={zoomRatio}>
        {label}
      </ChildLabel>
    </div>
  );
};

export const TrekChildMarker = (rank: number, zoomRatio = 1): DivIcon =>
  new DivIcon({
    iconSize: [markerHeight * zoomRatio, markerWidth * zoomRatio],
    // point of the icon which will correspond to marker's location
    iconAnchor: [(markerWidth * zoomRatio) / 2, markerHeight * zoomRatio], // horizontal middle of the icon and bottom of it
    html: renderToStaticMarkup(<ChildMarker label={`${rank}`} zoomRatio={zoomRatio} />),
    className: 'bg-none border-none',
  });
