import { FormattedMessage } from 'react-intl';
import { Bin } from 'components/Icons/Bin';

interface Props {
  resultsNumber: number;
  resetFilter: () => void;
}

const MobileBottomClear: React.FC<Props> = ({ resultsNumber, resetFilter }) => {
  return (
    <div className="flex w-[80vw] h-8 items-center fixed shadow-lg bg-white right-0 bottom-0">
      <button
        type="button"
        onClick={resetFilter}
        className="text-primary1 font-bold text-P2 flex items-center w-1/2 justify-center"
      >
        <Bin size={12} className="mr-2" aria-hidden />
        <FormattedMessage id={'search.filters.clearAll'} />
      </button>

      <div className="w-1/2 border-l border-solid border-greySoft text-center ">
        <FormattedMessage values={{ count: resultsNumber }} id="search.resultsFoundShort" />
      </div>
    </div>
  );
};

export default MobileBottomClear;
