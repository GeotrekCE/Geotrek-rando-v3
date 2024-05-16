interface Props {
  onClick: () => void;
  icon: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export const CloseButton: React.FC<Props> = ({ icon, children, ...props }) => {
  return (
    <button type="button" {...props}>
      {icon}
      {children}
    </button>
  );
};
