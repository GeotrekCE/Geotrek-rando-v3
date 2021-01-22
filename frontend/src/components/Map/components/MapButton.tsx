interface Props {
  icon: React.ReactNode;
}

export const MapButton = ({ icon }: Props) => (
  <div className="h-10 w-10 rounded-full absolute top-8 left-8 shadow-md bg-white z-mapButton flex justify-center items-center text-greyDarkColored">
    {icon}
  </div>
);
