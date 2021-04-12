import { DivIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import styled from 'styled-components';
import { colorPalette } from 'stylesheet';

const markerSize = 26;

const Round = styled.div`
  border-radius: 50%;
  background-color: ${colorPalette.redMarker};
  display: grid;
  place-items: center;
  color: ${colorPalette.white};

  height: ${markerSize}px;
  width: ${markerSize}px;
`;

const PointsReference: React.FC<{ number: number }> = ({ number }) => {
  return (
    <Round>
      <span>{number}</span>
    </Round>
  );
};

export const PointsReferenceMarker = (id: number): DivIcon =>
  new DivIcon({
    iconSize: [markerSize, markerSize],
    // point of the icon which will correspond to marker's location
    iconAnchor: [markerSize / 2, markerSize / 2], // horizontal middle of the icon and bottom of it,
    html: renderToStaticMarkup(<PointsReference number={id} />),
    className: 'bg-none border-none',
  });
