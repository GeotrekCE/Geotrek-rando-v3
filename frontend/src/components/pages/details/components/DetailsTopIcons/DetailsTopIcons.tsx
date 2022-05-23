import { DetailsDownloadIcons } from 'components/pages/details/components/DetailsDownloadIcons';
import getActivityColor from 'components/pages/search/components/ResultCard/getActivityColor';
import { Activity } from 'modules/activities/interface';
import React from 'react';
import SVG from 'react-inlinesvg';
import { colorPalette, fillSvgWithColor } from 'stylesheet';
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
  practice?: Activity;
  type?: 'TREK' | 'TOURISTIC_CONTENT' | 'OUTDOOR_SITE' | 'OUTDOOR_COURSE' | 'TOURISTIC_EVENT';
}

export const DetailsTopIcons: React.FC<DetailsTopIconsProps> = ({
  details,
  practice,
  type = 'TREK',
}) => {
  return (
    <>
      <div
        id="details_topRoundIcons"
        className="flex justify-between items-center mx-4 desktop:mx-12 menu-download"
        style={{zIndex:1}}
      >
        {practice && <ActivityLogo type={type} src={practice.pictogram} />}
        <div className="flex space-x-4">
          <div
            className={
              type === 'TREK' || type === 'OUTDOOR_SITE' || type === 'TOURISTIC_EVENT'
                ? 'desktop:hidden'
                : undefined
            }
          >
            <DetailsDownloadIcons details={details} size={30} hideReport={type !== 'TREK'} />
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
      <SVG src={src} preProcessor={fillSvgWithColor(colorPalette.white)} height={40} width={40} />
    </div>
    <div className="hidden desktop:block">
      <SVG src={src} preProcessor={fillSvgWithColor(colorPalette.white)} height={53} width={53} />
    </div>
  </div>
);
