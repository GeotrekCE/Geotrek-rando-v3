export interface ActivitySuggestionCardProps {
  title: string;
  imgUrl: string;
}

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
  );
};
