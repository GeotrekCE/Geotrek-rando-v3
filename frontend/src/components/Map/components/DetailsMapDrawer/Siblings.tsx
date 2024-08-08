import Link from 'components/Link';
import { generateChildrenDetailsUrl } from 'components/pages/details/utils';
import { TrekFamily } from 'modules/details/interface';
import { FormattedMessage } from 'react-intl';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';

interface Props {
  trekFamily?: TrekFamily | null;
  trekId?: number;
}

const Siblings: React.FC<Props> = ({ trekFamily, trekId }) => {
  if (!trekFamily || trekId === undefined || trekFamily.trekChildren.length < 2) {
    return null;
  }

  const index = trekFamily.trekChildren.findIndex(t => Number(t.id) === Number(trekId));
  const prev = index > 0 ? trekFamily.trekChildren[index - 1] : null;
  const next =
    index < trekFamily.trekChildren.length - 1 ? trekFamily.trekChildren[index + 1] : null;

  return (
    <div className="flex items-center justify-center gap-8">
      {prev && (
        <Link
          href={generateChildrenDetailsUrl(prev.id, prev.name, trekFamily.parentId)}
          className="flex items-center !text-primary1  gap-2"
        >
          <ArrowLeft aria-hidden />
          <FormattedMessage id="map.drawer.prev" />
        </Link>
      )}
      {next && (
        <Link
          href={generateChildrenDetailsUrl(next.id, next.name, trekFamily.parentId)}
          className="flex items-center !text-primary1 gap-2"
        >
          <FormattedMessage id="map.drawer.next" />
          <ArrowRight aria-hidden />
        </Link>
      )}
    </div>
  );
};

export default Siblings;
