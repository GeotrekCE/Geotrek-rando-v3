import { AlertTriangle } from 'components/Icons/AlertTriangle';
import { Reservation } from 'components/Icons/Reservation';
import { ThreeDMap } from 'components/Icons/ThreeDMap';
import { Printer } from 'components/Icons/Printer';
import { DetailsButton } from 'components/pages/details/components/DetailsButton';
import React, { useState } from 'react';
import ToolTip from 'components/ToolTip';
import { useIntl } from 'react-intl';
import { Download } from 'components/Icons/Download';
import { Details } from 'modules/details/interface';
import { ThreeD } from 'components/3D';
import { getMapConfig } from 'components/Map/config';
import { useMediaPredicate } from 'react-media-hook';
import { OutdoorCourseDetails } from '../../../../../modules/outdoorCourse/interface';
import { OutdoorSiteDetails } from '../../../../../modules/outdoorSite/interface';
import { TouristicContentDetails } from '../../../../../modules/touristicContent/interface';
import { TouristicEventDetails } from '../../../../../modules/touristicEvent/interface';
import { getGlobalConfig } from '../../../../../modules/utils/api.config';
import { DetailsButtonDropdown } from '../DetailsButtonDropdown';
import { useDetailsAndMapContext } from '../../DetailsAndMapContext';

interface DetailsTopIconsProps {
  details:
    | Details
    | TouristicContentDetails
    | OutdoorSiteDetails
    | OutdoorCourseDetails
    | TouristicEventDetails;
  size?: number;
  hideReport?: boolean;
}

export const DetailsDownloadIcons: React.FC<DetailsTopIconsProps> = ({
  details,
  size = 24,
  hideReport = false,
}) => {
  const [open3D, setOpen3D] = useState<boolean>(false);
  const { setReportVisibility } = useDetailsAndMapContext();

  const intl = useIntl();

  const isTouchScreen = useMediaPredicate('(hover: none)');
  const is3DfeatureEnabled =
    'WebGLRenderingContext' in global &&
    Boolean(getMapConfig().mapSatelliteLayerUrl) &&
    'length2d' in details &&
    getGlobalConfig().maxLengthTrekAllowedFor3DRando >= details.length2d &&
    'elevationAreaUrl' in details &&
    !isTouchScreen;

  const dropdownButtonOptions = [];
  if ('gpxUri' in details && details.gpxUri !== undefined)
    dropdownButtonOptions.push({
      label: (
        <div className={'flex items-center'}>
          <Download className="text-primary1 m-2" size={size} /> GPX
        </div>
      ),
      value: details.gpxUri,
    });
  if ('kmlUri' in details && details.kmlUri !== undefined)
    dropdownButtonOptions.push({
      label: (
        <div className={'flex items-center'}>
          <Download className="text-primary1 m-2" size={size} /> KML
        </div>
      ),
      value: details.kmlUri,
    });

  return (
    <div
      id="details_topDownloadIcons"
      className="flex justify-between items-center mx-4 desktop:mx-12 menu-download"
      data-testid={'download-button'}
    >
      {open3D && is3DfeatureEnabled && (
        <ThreeD
          trekId={Number(details.id)}
          title={details.title}
          demURL={details.elevationAreaUrl}
          profileURL={details.altimetricProfileUrl}
          onRequestClose={() => setOpen3D(false)}
        />
      )}

      <div className="flex space-x-4">
        {details.pdfUri && (
          <ToolTip
            toolTipText={intl.formatMessage({ id: 'tooltip.print' })}
            invertPosition
            id={intl.formatMessage({ id: 'tooltip.print' })}
          >
            <DetailsButton url={details.pdfUri}>
              <Printer size={30} />
            </DetailsButton>
          </ToolTip>
        )}

        {dropdownButtonOptions.length > 0 && (
          <ToolTip
            toolTipText={intl.formatMessage({ id: 'details.download' })}
            invertPosition
            id={intl.formatMessage({ id: 'details.download' })}
          >
            <DetailsButtonDropdown options={dropdownButtonOptions}>
              <Download className="text-primary1" size={size} />
            </DetailsButtonDropdown>
          </ToolTip>
        )}

        {Number(details.id) && !hideReport && getGlobalConfig().enableReport && (
          <ToolTip
            toolTipText={intl.formatMessage({ id: 'report.title' })}
            invertPosition
            id={intl.formatMessage({ id: 'report.title' })}
          >
            <DetailsButton url="#details_report" onClick={() => setReportVisibility(true)}>
              <AlertTriangle size={size} />
            </DetailsButton>
          </ToolTip>
        )}

        {(details as Details).reservation &&
          (details as Details).reservation_id &&
          getGlobalConfig().reservationPartner &&
          getGlobalConfig().reservationProject && (
            <ToolTip
              toolTipText={intl.formatMessage({ id: 'search.book' })}
              invertPosition
              id={intl.formatMessage({ id: 'search.book' })}
            >
              <DetailsButton url="#details_reservation">
                <Reservation width={30} height={30} />
              </DetailsButton>
            </ToolTip>
          )}

        {is3DfeatureEnabled && (
          <ToolTip
            toolTipText={intl.formatMessage({ id: 'tooltip.show3D' })}
            invertPosition
            id={intl.formatMessage({ id: 'tooltip.show3D' })}
          >
            <DetailsButton onClick={() => setOpen3D(true)}>
              <ThreeDMap size={size} />
            </DetailsButton>
          </ToolTip>
        )}
      </div>
    </div>
  );
};
