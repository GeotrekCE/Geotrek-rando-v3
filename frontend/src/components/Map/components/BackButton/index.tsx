import { ControlPosition } from 'leaflet';
import Control from '../CustomControl';

interface Props {
  children?: React.ReactNode;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
  position?: ControlPosition;
}

export const BackButton: React.FC<Props> = ({ children, icon, onClick, position = 'topleft' }) => (
  <Control position={position}>
    <button
      type="button"
      onClick={onClick}
      className="rounded-full p-2 shadow-md bg-white flex justify-center items-center text-greyDarkColored desktop:hidden"
    >
      {icon} {children !== undefined && <span className="ml-2">{children}</span>}
    </button>
  </Control>
);
