import { Link } from 'components/Link';
import { generateResultDetailsUrl } from 'components/pages/search/utils';

export interface ActivitySuggestionCardProps {
  id: string;
  title: string;
  imgUrl: string | null;
  className?: string;
}

export const ActivitySuggestionCard: React.FC<ActivitySuggestionCardProps> = ({
  id,
  title,
  imgUrl,
  className,
}) => {
  return (
    <Link href={generateResultDetailsUrl(id, title)}>
      <div
        id={'home_activitySuggestion'}
        className={`
        border border-solid border-greySoft
        hover:shadow-sm transition-all
        flex flex-col flex-shrink-0
        w-50 desktop:w-suggestionCardDesktop
        rounded-2xl overflow-hidden ${className ?? ''}`}
      >
        {imgUrl !== null ? (
          <img
            src={imgUrl}
            className="
            bg-greySoft
            h-30 desktop:h-60
            object-center object-cover overflow-hidden"
          />
        ) : (
          <div
            className="
            bg-greySoft
            h-30 desktop:h-60"
          />
        )}

        <div className="p-4">
          <span
            className="
            text-primary1 font-bold
            h-10 desktop:h-14
            overflow-hidden"
            style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}
          >
            {title}
          </span>
        </div>
      </div>
    </Link>
  );
};
