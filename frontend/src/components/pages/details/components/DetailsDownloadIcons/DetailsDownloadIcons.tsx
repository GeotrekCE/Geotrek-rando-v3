import React from 'react';

import { Download } from 'components/Icons/Download';
import { Printer } from 'components/Icons/Printer';
import { Details } from 'modules/details/interface';
import { TouristicContentDetails } from '../../../../../modules/touristicContent/interface';
import { DetailsButtonDropdown } from '../DetailsButtonDropdown';

interface DetailsTopIconsProps {
  details: Details | TouristicContentDetails;
  size?: number;
}

export const DetailsDownloadIcons: React.FC<DetailsTopIconsProps> = ({ details, size = 24 }) => {
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
      <div className="flex space-x-4">
        {dropdownButtonOptions.length > 0 && (
          <DetailsButtonDropdown options={dropdownButtonOptions}>
            <Download className="text-primary1 m-2" size={size} />
          </DetailsButtonDropdown>
        )}
      </div>
    </div>
  );
};
