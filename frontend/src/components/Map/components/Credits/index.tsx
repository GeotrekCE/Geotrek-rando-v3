import { ControlPosition } from 'leaflet';
import Control from '../CustomControl';

interface CreditsProps {
  children: React.ReactNode;
  position?: ControlPosition;
}

export const Credits: React.FC<CreditsProps> = ({ position = 'bottomright', children }) => {
  return (
    <Control position={position}>
      <div className="text-P1 py-1 px-2 text-black bg-opacity-50 bg-white">{children}</div>
    </Control>
  );
};
