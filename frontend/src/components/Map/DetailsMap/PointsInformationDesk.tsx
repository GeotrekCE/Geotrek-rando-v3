import React, { useMemo } from 'react';
import { Tooltip } from 'react-leaflet';
import { InformationDesk } from 'modules/informationDesk/interface';
import { LatLngTuple } from 'leaflet';
import { InfoCircle } from 'components/Icons/InfoCircle';
import { renderToStaticMarkup } from 'react-dom/server';
import { HoverableMarker } from '../components/HoverableMarker';

export type PointsInformationDeskProps = {
  informationDesks?: InformationDesk[];
};

type Locations = {
  name: string;
  position: LatLngTuple;
}[];

export const PointsInformationDesk: React.FC<PointsInformationDeskProps> = props => {
  if (!props.informationDesks) {
    return null;
  }

  const locations: Locations = useMemo(() => {
    return (props.informationDesks ?? [])
      .filter(({ longitude, latitude }) => longitude && latitude)
      .map(({ longitude, latitude, name }) => ({ name, position: [latitude, longitude] }));
  }, [props.informationDesks]);

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
          pictogramUri={renderToStaticMarkup(<InfoCircle color="white" />)}
          type={null}
        >
          <Tooltip>{location.name}</Tooltip>
        </HoverableMarker>
      ))}
    </>
  );
};
