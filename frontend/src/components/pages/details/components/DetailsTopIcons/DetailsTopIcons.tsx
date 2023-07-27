import { DetailsDownloadIcons } from 'components/pages/details/components/DetailsDownloadIcons';
import getActivityColor from 'components/pages/search/components/ResultCard/getActivityColor';
import { Activity } from 'modules/activities/interface';
import Image from 'next/image';
import SVG from 'react-inlinesvg';
import { fillSvgWithColor } from 'stylesheet';
import { Details } from '../../../../../modules/details/interface';
import { OutdoorCourseDetails } from '../../../../../modules/outdoorCourse/interface';
import { OutdoorSiteDetails } from '../../../../../modules/outdoorSite/interface';
import { TouristicContentDetails } from '../../../../../modules/touristicContent/interface';
import { TouristicEventDetails } from '../../../../../modules/touristicEvent/interface';

interface DetailsTopIconsProps {
  details:
    | Details
    | TouristicContentDetails
    | OutdoorSiteDetails
    | OutdoorCourseDetails
    | TouristicEventDetails;
  practice?: Activity | null;
  type?: 'TREK' | 'TOURISTIC_CONTENT' | 'OUTDOOR_SITE' | 'OUTDOOR_COURSE' | 'TOURISTIC_EVENT';
  displayReservationWidget?: boolean;
}

interface IconProps {
  height?: number;
  width?: number;
  src?: string;
}

const Icon: React.FC<IconProps> = ({ src = '', ...props }) => {
  if (!src) {
    return null;
  }
  if (RegExp(/(.*).svg/).test(src)) {
    return <SVG src={src} {...props} className="text-white" preProcessor={fillSvgWithColor()} />;
  }
  return <Image loading="lazy" src={src} {...props} alt="" />;
};

export const DetailsTopIcons: React.FC<DetailsTopIconsProps> = ({
  details,
  practice,
  type = 'TREK',
  displayReservationWidget = true,
}) => {
  return (
    <>
      <div
        id="details_topRoundIcons"
        className="flex justify-between items-center mx-4 desktop:mx-12 menu-download"
      >
        {practice && <ActivityLogo type={type} src={practice.pictogramUri} />}
        <div className="flex space-x-4">
          <div
            className={
              type === 'TREK' || type === 'OUTDOOR_SITE' || type === 'TOURISTIC_EVENT'
                ? 'desktop:hidden'
                : undefined
            }
          >
            <DetailsDownloadIcons
              details={details}
              size={30}
              displayReport={type === 'TREK'}
              displayReservationWidget={displayReservationWidget}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const ActivityLogo: React.FC<{
  src: string;
  type?: 'TREK' | 'TOURISTIC_CONTENT' | 'OUTDOOR_SITE' | 'OUTDOOR_COURSE' | 'TOURISTIC_EVENT';
}> = ({ src, type }) => (
  <div
    className="h-12 w-12 desktop:h-18 desktop:w-18 rounded-full
      flex items-center justify-center
      shadow-md
    bg-primary1"
    style={{ background: getActivityColor(type) }}
  >
    <div className="desktop:hidden">
      <Icon src={src} height={40} width={40} />
    </div>
    <div className="hidden desktop:block">
      <Icon src={src} height={53} width={53} />
    </div>
  </div>
);
