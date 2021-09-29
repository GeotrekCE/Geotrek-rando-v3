import { AlertTriangle } from 'components/Icons/AlertTriangle';
import { DetailsDownloadIcons } from 'components/pages/details/components/DetailsDownloadIcons';
import Report from 'components/Report/Report';
import { Activity } from 'modules/activities/interface';
import React, { useState } from 'react';
import SVG from 'react-inlinesvg';
import { colorPalette, fillSvgWithColor } from 'stylesheet';
import { Details } from '../../../../../modules/details/interface';
import { PointGeometry } from '../../../../../modules/interface';
import { TouristicContentDetails } from '../../../../../modules/touristicContent/interface';
import { getGlobalConfig } from '../../../../../modules/utils/api.config';
import { DetailsButton } from '../DetailsButton';

interface DetailsTopIconsProps {
  details: Details | TouristicContentDetails;
  practice?: Activity;
  trekId?: number;
  startPoint?: PointGeometry;
  type?: 'TREK' | 'TOURISTIC_CONTENT';
}

export const DetailsTopIcons: React.FC<DetailsTopIconsProps> = ({
  details,
  practice,
  trekId,
  startPoint,
  type = 'TREK',
}) => {
  const [openReport, setOpenReport] = useState<boolean>(false);

  const handleOpenReport = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    setOpenReport(true);
  };

  return (
    <>
      {openReport && trekId && startPoint && (
        <Report
          trekId={trekId}
          startPoint={startPoint}
          onRequestClose={() => setOpenReport(false)}
        />
      )}

      <div
        id="details_topRoundIcons"
        className="flex justify-between items-center mx-4 desktop:mx-12 menu-download"
      >
        {practice && <ActivityLogo src={practice.pictogram} />}
        <div className="flex space-x-4">
          <div className={type === 'TREK' ? 'desktop:hidden' : undefined}>
            <DetailsDownloadIcons details={details} size={30} />
          </div>
          {trekId && getGlobalConfig().enableReport && (
            <>
              <DetailsButton url={'#'} onClick={handleOpenReport}>
                <AlertTriangle size={30} />
              </DetailsButton>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const ActivityLogo: React.FC<{ src: string }> = ({ src }) => (
  <div
    className="h-12 w-12 desktop:h-18 desktop:w-18 rounded-full
      flex items-center justify-center
      shadow-md
    bg-primary1"
  >
    <div className="desktop:hidden">
      <SVG src={src} preProcessor={fillSvgWithColor(colorPalette.white)} height={40} width={40} />
    </div>
    <div className="hidden desktop:block">
      <SVG src={src} preProcessor={fillSvgWithColor(colorPalette.white)} height={53} width={53} />
    </div>
  </div>
);
