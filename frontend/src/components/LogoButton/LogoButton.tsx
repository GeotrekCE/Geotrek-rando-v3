interface Props {
  children: React.ReactNode;
  className?: string;
}

export const LogoButton: React.FC<Props> = ({ className, children }) => {
  return (
    <div
      className={`h-8 w-8 rounded-2xl
        flex items-center justify-center
        cursor-pointer
      bg-greySoft text-black ${className ?? ''}`}
    >
      <span>{children}</span>
    </div>
  );
};
