import { ChevronDown } from 'components/Icons/ChevronDown';
import { getActivityColorClassName } from 'components/pages/search/components/ResultCard/getActivityColor';
import { cn } from 'services/utils/cn';

export interface Props {
  title: string | React.ReactElement;
  onClick?: () => void;
  numberSelected: number;
  type: string;
}

export const MobileFilterMenuSection: React.FC<Props> = ({
  title,
  onClick,
  numberSelected,
  type = null,
}) => {
  const classNameSectionName = cn(
    'font-bold text-Mobile-C1 w-full',
    numberSelected > 0 ? 'text-primary1' : 'text-greyDarkColored',
    getActivityColorClassName(type, { withColor: true }),
  );

  return (
    <button
      onClick={onClick}
      className="pt-4 pb-4 outline-none border-b border-solid border-greySoft flex items-center w-full text-left"
      type="button"
    >
      {numberSelected > 0 && (
        <span
          className={cn(
            'bg-primary1 text-white text-center rounded-full size-6 font-bold mr-2',
            getActivityColorClassName(type, { withBackground: true }),
          )}
        >
          {numberSelected}
        </span>
      )}
      <span className={classNameSectionName}>{title}</span>
      <ChevronDown
        className={cn(
          '-rotate-90 text-primary1 ml-auto',
          getActivityColorClassName(type, { withColor: true }),
        )}
        size={24}
        aria-hidden
      />
    </button>
  );
};
