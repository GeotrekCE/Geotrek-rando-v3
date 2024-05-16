import { ChevronDown } from 'components/Icons/ChevronDown';

export interface Props {
  title: string | React.ReactElement;
  onClick?: () => void;
  numberSelected: number;
  color: string;
}

export const MobileFilterMenuSection: React.FC<Props> = ({
  title,
  onClick,
  numberSelected,
  color,
}) => {
  const classNameSectionName = `font-bold text-Mobile-C1 w-full ${
    numberSelected > 0 ? 'text-primary1' : 'text-greyDarkColored'
  }`;

  return (
    <button
      onClick={onClick}
      className="pt-4 pb-4 outline-none border-b border-solid border-greySoft flex items-center w-full text-left"
      type="button"
    >
      {numberSelected > 0 && (
        <span
          className="bg-primary1 text-white text-center rounded-full size-6 font-bold mr-2"
          style={{ backgroundColor: color }}
        >
          {numberSelected}
        </span>
      )}
      <span className={classNameSectionName} style={{ color }}>
        {title}
      </span>
      <ChevronDown
        className="-rotate-90 text-primary1 ml-auto"
        size={24}
        color={color}
        aria-hidden
      />
    </button>
  );
};
