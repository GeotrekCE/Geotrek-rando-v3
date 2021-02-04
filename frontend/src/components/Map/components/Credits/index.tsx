interface CreditsProps {
  children: React.ReactNode;
  className?: string;
}

export const Credits: React.FC<CreditsProps> = ({ children, className }) => {
  return (
    <div className={`${className ?? ''} text-P1 py-1 px-2 text-black bg-opacity-50 bg-white`}>
      {children}
    </div>
  );
};
