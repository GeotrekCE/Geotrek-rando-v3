import { AlertTriangle } from 'components/Icons/AlertTriangle';
import { Reservation } from 'components/Icons/Reservation';
import { ThreeDMap } from 'components/Icons/ThreeDMap';
import { Printer } from 'components/Icons/Printer';
import { DetailsButton } from 'components/pages/details/components/DetailsButton';
import { useState } from 'react';
import ToolTip from 'components/ToolTip';
import { FormattedMessage, useIntl } from 'react-intl';
import { Download } from 'components/Icons/Download';
import { Details } from 'modules/details/interface';
import { ThreeD } from 'components/3D';
import { getMapConfig } from 'components/Map/config';
import { useMediaPredicate } from 'react-media-hook';
import useHasMounted from 'hooks/useHasMounted';
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
  displayReport?: boolean;
  displayReservationWidget?: boolean;
}

export const DetailsDownloadIcons: React.FC<DetailsTopIconsProps> = ({
  details,
  size = 24,
  displayReport = true,
  displayReservationWidget = true,
}) => {
  const [open3D, setOpen3D] = useState<boolean>(false);
  const { setReportVisibility } = useDetailsAndMapContext();

  const intl = useIntl();

  const isTouchScreen = useMediaPredicate('(hover: none)');
  const hasWebGLRenderingContext = useHasMounted('WebGLRenderingContext' in global);

  const is3DfeatureEnabled =
    hasWebGLRenderingContext &&
    getMapConfig().mapSatelliteLayers !== null &&
    'length2d' in details &&
    getGlobalConfig().maxLengthTrekAllowedFor3DRando >= details.length2d &&
    'elevationAreaUrl' in details &&
    !isTouchScreen;

  const dropdownButtonOptions = [];
  if ('gpxUri' in details) {
    dropdownButtonOptions.push({
      label: 'GPX',
      size,
      value: details.gpxUri,
    });
  }
  if ('kmlUri' in details) {
    dropdownButtonOptions.push({
      label: 'KML',
      size,
      value: details.kmlUri,
    });
  }

  return (
    <div
      id="details_topDownloadIcons"
      className="flex justify-between items-center gap-4 desktop:mr-12 desktop:ml-auto menu-download"
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

      {details.pdfUri && (
        <ToolTip toolTipText={intl.formatMessage({ id: 'tooltip.print' })} invertPosition>
          <DetailsButton url={details.pdfUri}>
            <Printer size={30} aria-hidden />
            <span className="sr-only"><FormattedMessage id="tooltip.print" /></span>
          </DetailsButton>
        </ToolTip>
      )}

      {dropdownButtonOptions.length > 0 && (
        <ToolTip toolTipText={intl.formatMessage({ id: 'details.download' })} invertPosition>
          <DetailsButtonDropdown options={dropdownButtonOptions}>
            <Download className="text-primary1" size={size} aria-hidden />
            <span className="sr-only"><FormattedMessage id="details.download" /></span>
          </DetailsButtonDropdown>
        </ToolTip>
      )}

      {displayReport && Number(details.id) && getGlobalConfig().enableReport && (
        <ToolTip toolTipText={intl.formatMessage({ id: 'report.title' })} invertPosition>
          <DetailsButton url="#details_report" onClick={() => setReportVisibility(true)}>
            <AlertTriangle size={size} aria-hidden />
            <span className="sr-only"><FormattedMessage id="report.title" /></span>
          </DetailsButton>
        </ToolTip>
      )}

      {displayReservationWidget &&
        (details as Details).reservation &&
        (details as Details).reservation_id &&
        getGlobalConfig().reservationPartner &&
        getGlobalConfig().reservationProject && (
          <ToolTip toolTipText={intl.formatMessage({ id: 'search.book' })} invertPosition>
            <DetailsButton url="#details_reservationWidget">
              <Reservation width={30} height={30} aria-hidden />
              <span className="sr-only"><FormattedMessage id="search.book" /></span>
            </DetailsButton>
          </ToolTip>
        )}

      {is3DfeatureEnabled && (
        <ToolTip toolTipText={intl.formatMessage({ id: 'tooltip.show3D' })} invertPosition>
          <DetailsButton onClick={() => setOpen3D(true)}>
            <ThreeDMap size={size} aria-hidden/>
            <span className="sr-only"><FormattedMessage id="tooltip.show3D" /></span>
          </DetailsButton>
        </ToolTip>
      )}
    </div>
  );
};
