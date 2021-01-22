interface Props {
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export const MapButton = ({ icon, onClick, className }: Props) => (
  <div
    onClick={onClick}
    className={`h-10 w-10 rounded-full absolute top-8 left-8 shadow-md bg-white z-mapButton flex justify-center items-center text-greyDarkColored ${
      className ?? ''
    }`}
  >
    {icon}
  </div>
);
