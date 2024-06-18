import { DivIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import styled from 'styled-components';
import { colorPalette } from 'stylesheet';

// Not typed by the lib, this is guessed from the documentation
// https://www.npmjs.com/package/react-leaflet-markercluster#api
interface ClusterType {
  getChildCount: () => number;
}

const Round = styled.div`
  border-radius: 50%;
  background-color: ${colorPalette.primary1};
  display: grid;
  place-items: center;
  color: ${colorPalette.white};

  transition: transform 150ms;
  &:hover {
    transform: scale(1.1);
  }
`;

const Cluster: React.FC<{ number: number }> = ({ number }) => {
  return (
    <Round className="size-10 font-bold text-H4">
      <span>{number}</span>
    </Round>
  );
};

export const ClusterMarker = (cluster: ClusterType): DivIcon =>
  new DivIcon({
    iconSize: [40, 40],
    // point of the icon which will correspond to marker's location
    iconAnchor: [20, 20], // horizontal middle of the icon and bottom of it,
    html: renderToStaticMarkup(<Cluster number={cluster.getChildCount()} />),
    className: 'bg-none border-none',
  });
