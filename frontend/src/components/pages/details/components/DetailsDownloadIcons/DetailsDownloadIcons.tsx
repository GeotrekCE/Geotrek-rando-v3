import { AlertTriangle } from 'components/Icons/AlertTriangle';
import { DetailsButton } from 'components/pages/details/components/DetailsButton';
import Report from 'components/Report/Report';
import React, { useState } from 'react';

import { Download } from 'components/Icons/Download';
import { Printer } from 'components/Icons/Printer';
import { Details } from 'modules/details/interface';
import { TouristicContentDetails } from '../../../../../modules/touristicContent/interface';
import { getGlobalConfig } from '../../../../../modules/utils/api.config';
import { DetailsButtonDropdown } from '../DetailsButtonDropdown';

interface DetailsTopIconsProps {
  details: Details | TouristicContentDetails;
  size?: number;
  type?: 'TREK' | 'TOURISTIC_CONTENT';
}

export const DetailsDownloadIcons: React.FC<DetailsTopIconsProps> = ({ details, size = 24 }) => {
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
  if ('pdfUri' in details && details.pdfUri !== undefined)
    dropdownButtonOptions.push({
      label: (
        <div className={'flex items-center'}>
          <Printer className="text-primary1 m-2" size={size} /> PDF
        </div>
      ),
      value: details.pdfUri,
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
        {dropdownButtonOptions.length > 0 && (
          <DetailsButtonDropdown options={dropdownButtonOptions}>
            <Download className="text-primary1" size={size} />
          </DetailsButtonDropdown>
        )}

        {details.id && getGlobalConfig().enableReport && (
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
