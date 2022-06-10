import { DetailsDownloadIcons } from 'components/pages/details/components/DetailsDownloadIcons';
import React, { MutableRefObject } from 'react';
import { FormattedMessage } from 'react-intl';
import { sizes } from 'stylesheet';
import { Details } from '../../../../../modules/details/interface';
import { OutdoorCourseDetails } from '../../../../../modules/outdoorCourse/interface';
import { OutdoorSiteDetails } from '../../../../../modules/outdoorSite/interface';
import { TouristicEventDetails } from '../../../../../modules/touristicEvent/interface';
import { DetailsHeaderSection } from '../../useDetails';
import { useDetailsHeader } from './useDetailsHeader';

interface DetailsHeaderProps {
  sectionsReferences: MutableRefObject<DetailsHeaderSection>;
  details: Details | OutdoorSiteDetails | OutdoorCourseDetails | TouristicEventDetails;
  type: 'TREK' | 'OUTDOOR_SITE' | 'OUTDOOR_COURSE' | 'TOURISTIC_EVENT';
}

const scrollTo = (element: HTMLDivElement | undefined | null) => {
  if (element !== null && element !== undefined) {
    // offsetTop : offset to the closest relative parent
    const adjustedPosition =
      element.offsetTop +
      sizes.coverDetailsDesktop +
      sizes.desktopHeader -
      sizes.detailsHeaderDesktop -
      sizes.topIconsDetailsDesktop;
    window.scrollTo({ top: adjustedPosition, behavior: 'smooth' });
  }
};

export const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  sectionsReferences,
  details,
  type,
}) => {
  const { detailsHeaderSection, currentSectionId } = useDetailsHeader(sectionsReferences);
  return (
    <div
      id="details_headerDesktop"
      className="hidden desktop:flex
      sticky top-desktopHeader z-subHeader
      shadow-md bg-white"
      style={{ height: 55 }}
    >
      <div id="details_headerDesktop_inlineMenu" className="flex flex-1 pb-2.5 pt-4 ml-3">
        {(Object.keys(detailsHeaderSection) as Array<keyof DetailsHeaderSection>)
          .filter(sectionId => sectionId !== 'report')
          .map(sectionId => (
            <div
              onClick={() => scrollTo(detailsHeaderSection[sectionId])}
              key={sectionId}
              className="text-center"
            >
              <span
                className={`hover:text-primary1 mx-5
                pb-1 border-b-2 hover:border-primary1 border-transparent border-solid
                cursor-pointer transition-all duration-300 ${
                  currentSectionId === sectionId ? 'text-primary1 border-primary1' : ''
                }`}
              >
                <FormattedMessage id={`details.${sectionId}`} />
              </span>
            </div>
          ))}
      </div>
      <DetailsDownloadIcons details={details} hideReport={type !== 'TREK'} />
    </div>
  );
};
