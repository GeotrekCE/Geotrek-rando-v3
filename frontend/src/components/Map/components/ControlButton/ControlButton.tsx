interface ControlButtonProps {
  icon: React.ReactNode;
  className?: string;
  active?: boolean;
  onClick?: () => void;
}

export const ControlButton: React.FC<ControlButtonProps> = ({
  icon,
  className = '',
  onClick,
  active = false,
}) => {
  return (
    <button
      className={`h-10 w-10 rounded-lg shadow-md z-mapButton
      ${active ? 'bg-primary1 text-white' : 'bg-white text-greyDarkColored'}
      flex justify-center items-center mb-3
      ${className}`}
      onClick={onClick}
      type="button"
    >
      {icon}
    </button>
  );
};
