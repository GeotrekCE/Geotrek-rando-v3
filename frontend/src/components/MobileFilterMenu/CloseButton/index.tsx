interface Props {
  onClick: () => void;
  icon: React.ReactNode;
  className?: string;
}

export const CloseButton: React.FC<Props> = ({ icon, ...props }) => {
  return (
    <button type="button" {...props}>
      {icon}
    </button>
  );
};
