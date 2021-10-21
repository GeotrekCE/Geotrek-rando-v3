import { AlertTriangle } from 'components/Icons/AlertTriangle';
import { Printer } from 'components/Icons/Printer';
import { DetailsButton } from 'components/pages/details/components/DetailsButton';
import Report from 'components/Report/Report';
import React, { useState } from 'react';

import { Download } from 'components/Icons/Download';
import { Details } from 'modules/details/interface';
import { TouristicContentDetails } from '../../../../../modules/touristicContent/interface';
import { getGlobalConfig } from '../../../../../modules/utils/api.config';
import { DetailsButtonDropdown } from '../DetailsButtonDropdown';

interface DetailsTopIconsProps {
  details: Details | TouristicContentDetails;
  size?: number;
  hideReport?: boolean;
  type: 'TREK' | 'TOURISTIC_CONTENT';
}

export const DetailsDownloadIcons: React.FC<DetailsTopIconsProps> = ({
  details,
  size = 24,
  hideReport = false,
  type,
}) => {
  const [openReport, setOpenReport] = useState<boolean>(false);

  const handleOpenReport = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    setOpenReport(true);
  };

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
      {openReport && (
        <Report
          trekId={Number(details.id)}
          startPoint={{
            type: 'Point',
            // @ts-ignore
            coordinates:
              'trekDeparture' in details ? details.trekDeparture : details.geometry?.coordinates,
          }}
          onRequestClose={() => setOpenReport(false)}
        />
      )}

      <div className="flex space-x-4">
        {details.pdfUri && (
          <DetailsButton url={details.pdfUri}>
            <Printer size={30} />
          </DetailsButton>
        )}

        {dropdownButtonOptions.length > 0 && (
          <DetailsButtonDropdown options={dropdownButtonOptions}>
            <Download className="text-primary1" size={size} />
          </DetailsButtonDropdown>
        )}

        {details.id && !hideReport && getGlobalConfig().enableReport && (
          <>
            <DetailsButton url={'#'} onClick={handleOpenReport}>
              <AlertTriangle size={size} />
            </DetailsButton>
          </>
        )}
      </div>
    </div>
  );
};
