interface Props {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * Base Information component with an unopiniated icon props, please use LocalIconInformation or RemoteIconInformation
 * @deprecated
 */
export const Information: React.FC<Props> = ({ icon, children, className = '' }) => {
  return (
    <div className={`flex items-center text-primary1 ${className}`}>
      {icon}
      <span className="ml-2 text-greyDarkColored">{children}</span>
    </div>
  );
};
