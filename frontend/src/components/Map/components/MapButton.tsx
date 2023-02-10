interface Props {
  children?: React.ReactNode;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export const MapButton: React.FC<Props> = ({ icon, className = '', children, ...props }) => (
  <button
    type="button"
    className={`rounded-full p-2 absolute top-8 left-8 shadow-md bg-white z-mapButton flex justify-center items-center text-greyDarkColored ${className}`}
    {...props}
  >
    {icon} {children !== undefined && <span className="ml-2">{children}</span>}
  </button>
);
