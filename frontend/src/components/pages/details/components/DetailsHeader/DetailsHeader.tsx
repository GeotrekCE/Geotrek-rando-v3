import { DetailsDownloadIcons } from 'components/pages/details/components/DetailsDownloadIcons';
import React, { MutableRefObject } from 'react';
import { FormattedMessage } from 'react-intl';
import { cn } from 'services/utils/cn';
import useHasMounted from 'hooks/useHasMounted';
import { TouristicContentDetails } from 'modules/touristicContent/interface';
import { Details } from 'modules/details/interface';
import { OutdoorCourseDetails } from 'modules/outdoorCourse/interface';
import { OutdoorSiteDetails } from 'modules/outdoorSite/interface';
import { TouristicEventDetails } from 'modules/touristicEvent/interface';
import { ContentType } from 'modules/interface';
import { DetailsHeaderSection, DetailsSections } from '../../useDetails';
import { useDetailsHeader } from './useDetailsHeader';

interface DetailsHeaderProps {
  anchors: Partial<DetailsSections>[];
  sectionsReferences: MutableRefObject<DetailsHeaderSection>;
  details:
    | Details
    | OutdoorSiteDetails
    | OutdoorCourseDetails
    | TouristicContentDetails
    | TouristicEventDetails;
  type: ContentType;
}

export const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  anchors,
  sectionsReferences,
  details,
  type,
}) => {
  const { detailsHeaderSection, currentSectionId } = useDetailsHeader(sectionsReferences);
  const availableSection = anchors.filter(item => Object.keys(detailsHeaderSection).includes(item));
  const isMounted = useHasMounted();
  const sections = availableSection
    // Report and ReservationWidget anchors are in <DetailsDownloadIcons /> below
    .filter(sectionId => sectionId !== 'report' && sectionId !== 'reservationWidget');

  return (
    <nav
      id="details_headerDesktop"
      className="hidden desktop:flex
      sticky top-desktopHeader z-subHeader
      shadow-md bg-white h-14"
      role="navigation"
    >
      {sections.length > 0 && (
        <ul
          id="details_headerDesktop_inlineMenu"
          className="flex flex-1 pb-2.5 pt-4 ml-3 text-center"
        >
          {sections.map(sectionId => (
            <li key={sectionId}>
              <a
                className={cn(
                  'mx-5 pb-1 border-b-2 border-transparent border-solid transition-all duration-300  hover:text-primary1 hover:border-primary1 focus:text-primary1 focus:border-primary1',
                  currentSectionId === sectionId && isMounted && 'text-primary1 border-primary1',
                )}
                href={`#details_${sectionId}`}
              >
                <FormattedMessage id={`details.${sectionId}`} />
              </a>
            </li>
          ))}
        </ul>
      )}
      <DetailsDownloadIcons
        details={details}
        displayReport={type === 'TREK' && availableSection.includes('report')}
        displayReservationWidget={availableSection.includes('reservationWidget')}
      />
    </nav>
  );
};
