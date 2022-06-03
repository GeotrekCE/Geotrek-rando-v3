import React, { useMemo } from 'react';
import { Tooltip } from 'react-leaflet';
import { Signage } from 'components/Icons/Signage';
import { renderToStaticMarkup } from 'react-dom/server';
import { SignageDictionary } from 'modules/signage/interface';
import styled, { css } from 'styled-components';
import { desktopOnly, getSpacing } from 'stylesheet';
import { textEllipsisAfterNLines } from 'services/cssHelpers';
import { RawCoordinate2D } from 'modules/interface';
import { HoverableMarker } from '../components/HoverableMarker';

export type PointsSignageProps = {
  signage?: SignageDictionary | null;
};

type Locations = {
  description: string;
  name: string;
  imageUrl: string | undefined | null;
  pictogramUri: string;
  position: RawCoordinate2D;
  type: string;
}[];

export const PointsSignage: React.FC<PointsSignageProps> = ({ signage }) => {
  const locations: Locations = useMemo(() => {
    return Object.values(signage ?? {})
      .filter(({ geometry }) => Boolean(geometry?.coordinates))
      .map(({ description, geometry, name, type, imageUrl }) => ({
        description,
        imageUrl,
        name,
        pictogramUri: type.pictogram ?? renderToStaticMarkup(<Signage color="white" />),
        position: [geometry.coordinates[1], geometry.coordinates[0]],
        type: type.label,
      }));
  }, []);

  if (locations.length === 0) {
    return null;
  }

  return (
    <>
      {locations.map((location, index: number) => (
        <HoverableMarker
          id={location.position.join('')}
          key={index}
          position={location.position}
          pictogramUri={location.pictogramUri}
          type={null}
        >
          <StyledTooltip>
            <div className="flex flex-col">
              {location.imageUrl !== undefined && location.imageUrl !== null && (
                <CoverImage src={location.imageUrl} alt="" />
              )}
              <div className="p-4">
                <div className="text-P2 mb-1 text-greyDarkColored">{location.type}</div>
                <Name className="text-Mobile-C1 text-primary1 font-bold desktop:text-H4">
                  {location.name}
                </Name>
                <p
                  className="text-P2 mb-1"
                  dangerouslySetInnerHTML={{
                    __html: location.description,
                  }}
                />
              </div>
            </div>
          </StyledTooltip>
        </HoverableMarker>
      ))}
    </>
  );
};

const desktopWidth = 288;
const desktopImgHeight = 122;
const mobileWidth = 215;
const mobileImgHeight = 133;

const StyledTooltip = styled(Tooltip)`
  padding: 0;
  border: 0px !important;
  border-radius: ${getSpacing(4)} !important;
  overflow: hidden;
  white-space: initial !important;
  width: ${mobileWidth}px;
  ${desktopOnly(css`
    width: ${desktopWidth}px;
  `)};
`;

const Name = styled.span`
  ${textEllipsisAfterNLines(2)}

  ${desktopOnly(css`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
  `)}
`;

const CoverImage = styled.img`
  height: ${mobileImgHeight}px;
  ${desktopOnly(css`
    height: ${desktopImgHeight}px;
  `)}
  object-fit: cover;
`;
