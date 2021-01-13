export interface ActivitySuggestionCardProps {
  title: string;
  imgUrl: string;
}

const MAX_VISIBLE_CHARACTERS_DESKTOP = 80;
const MAX_VISIBLE_CHARACTERS_MOBILE = 35;

export const ActivitySuggestionCard: React.FC<ActivitySuggestionCardProps> = ({
  title,
  imgUrl,
}) => {
  return (
    <div
      className="
      border border-solid border-greySoft
      flex flex-col flex-shrink-0
      w-50 desktop:w-90
      rounded-2xl overflow-hidden"
    >
      <div
        className="
        bg-greySoft
        h-30 desktop:h-60
        overflow-hidden bg-cover"
      >
        <img src={imgUrl}></img>
      </div>
      <div
        className="
        text-primary1 font-bold
        h-14 desktop:h-18
        p-4
        "
      >
        <TruncateTitle title={title} />
      </div>
    </div>
  );
};

const TruncateTitle: React.FC<{ title: string }> = ({ title }) => {
  const titleDesktop =
    title.length > MAX_VISIBLE_CHARACTERS_DESKTOP
      ? title.slice(0, MAX_VISIBLE_CHARACTERS_DESKTOP) + '...'
      : title;
  const titleMobile =
    title.length > MAX_VISIBLE_CHARACTERS_MOBILE
      ? title.slice(0, MAX_VISIBLE_CHARACTERS_MOBILE) + '...'
      : title;
  return (
    <>
      <span className="desktop:hidden">{titleMobile}</span>
      <span className="hidden desktop:block">{titleDesktop}</span>
    </>
  );
};
