import { GenericIconProps } from 'components/Icons/types';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.FC<GenericIconProps>;
}

export const Button: React.FC<Props> = ({
  icon: Icon,
  children,
  className,
  ...nativeButtonsProps
}) => {
  return (
    <button
      {...nativeButtonsProps}
      className={`flex items-center
      py-1 px-4
      border border-solid border-primary1 rounded-button
      text-primary1 font-semibold bg-white
      hover:shadow-button hover:text-primary1-light hover:border-primary1-light cursor-pointer focus:outline-none transition-all duration-300
      ${className ?? ''}`}
    >
      {Icon && <Icon size={24} className="mr-1" />}
      {children}
    </button>
  );
};
export default Button;
