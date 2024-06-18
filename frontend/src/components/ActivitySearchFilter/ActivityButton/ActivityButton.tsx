import SVG from 'react-inlinesvg';

import { optimizeAndDefineColor } from 'stylesheet';
import { Link } from 'components/Link';
import { ActivityFilter } from 'modules/activities/interface';
import { cn } from 'services/utils/cn';
import { getActivityColorClassName } from 'components/pages/search/components/ResultCard/getActivityColor';

interface Props {
  iconUrl: string;
  href: string;
  label: string;
  type: ActivityFilter['type'];
}

export const ActivityButton: React.FC<Props> = ({ iconUrl, href, label, type = null }) => {
  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col items-center text-center mt-6 text-greyDarkColored bg-white transition',
        getActivityColorClassName(type, { withColorHover: true }),
      )}
    >
      <SVG src={iconUrl} className="h-9 desktop:w-12" preProcessor={optimizeAndDefineColor()} />
      <span className="w-20 text-sm mt-2 text-ellipsis overflow-hidden">{label}</span>
    </Link>
  );
};
