interface ControlButtonProps {
  icon: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ControlButton: React.FC<ControlButtonProps> = ({ icon, className, onClick }) => {
  return (
    <div
      className={`h-10 w-10 rounded-lg shadow-md bg-white z-mapButton flex justify-center items-center text-greyDarkColored mb-3 ${
        className ?? ''
      }`}
      onClick={onClick}
    >
      {icon}
    </div>
  );
};
