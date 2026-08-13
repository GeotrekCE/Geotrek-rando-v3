import { Separator } from 'components/Separator';
import { FormattedMessage } from 'react-intl';
import { cn } from 'services/utils/cn';

export interface DetailsSectionProps {
  titleId?: string;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  htmlId?: string;
}

export const DetailsSection: React.FC<DetailsSectionProps> = ({
  titleId,
  title,
  children,
  className,
  htmlId,
}) => {
  return (
    <div className={cn('scroll-mt-20 desktop:scroll-mt-30', className)} id={htmlId}>
      <div
        id="details_section"
        className={cn(`flex flex-col
          gap-3 desktop:gap-4
          pt-6 desktop:pt-12
          pb-3 desktop:pb-6
          mb-3 desktop:mb-6
          max-w-full overflow-x-auto
          `)}
      >
        {(title !== undefined || titleId !== undefined) && (
          <h2 className="text-Mobile-H1 desktop:text-H2 font-bold" id="details_sectionTitle">
            {title ?? (
              <FormattedMessage
                id={titleId}
                defaultMessage={titleId === 'details.vigilance' ? 'Zones de vigilance' : undefined}
              />
            )}
          </h2>
        )}
        <div
          id="details_sectionContent"
          className="flex flex-col gap-6
          text-Mobile-C1 desktop:text-P1"
        >
          {children}
        </div>
      </div>
      <Separator />
    </div>
  );
};
