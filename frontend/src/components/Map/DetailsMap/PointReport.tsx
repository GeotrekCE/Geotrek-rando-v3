import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import 'leaflet/dist/leaflet.css';
import { useDetailsAndMapContext } from 'components/pages/details/DetailsAndMapContext';
import { AlertCircle } from 'components/Icons/AlertCircle';
import { Icon, LatLngLiteral } from 'leaflet';
import styled from 'styled-components';
import { borderRadius, colorPalette } from 'stylesheet';
import { useMapEvents } from 'react-leaflet';
import { FormattedMessage } from 'react-intl';
import { DraggableMarker } from '../components/DraggableMarker';
import { TrekMarker } from '../Markers/TrekMarker';

const Message = styled.p`
  border: 1px solid ${colorPalette.red};
  z-index: 400;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  border-radius: ${borderRadius.roundButton};
  color: ${colorPalette.red};
  background-color: ${colorPalette.white};
`;

export const PointReport: React.FC = () => {
  const {
    coordinatesReport,
    coordinatesReportTouched,
    setCoordinatesReport,
    setCoordinatesReportTouched,
  } = useDetailsAndMapContext();
  if (coordinatesReport === null) {
    return null;
  }

  const pictogram = TrekMarker(
    renderToStaticMarkup(<AlertCircle color="white" />),
    1.3,
    colorPalette.red,
  ) as Icon;

  const handleChange = (latLng: LatLngLiteral) => {
    setCoordinatesReportTouched(true);
    setCoordinatesReport({
      type: 'Point',
      coordinates: {
        x: latLng.lng,
        y: latLng.lat,
      },
    });
  };

  useMapEvents({
    click: ({ latlng }: { latlng: LatLngLiteral }) => {
      handleChange(latlng);
    },
  });

  const message = coordinatesReportTouched ? 'report.mapButton.edit' : 'report.mapButton.create';

  const {
    coordinates: { x: lng, y: lat },
  } = coordinatesReport;
  return (
    <>
      <Message className="flex p-2 gap-2 text-sm absolute top-6 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
        <AlertCircle size={24} />
        <FormattedMessage id={message} />
      </Message>
      <DraggableMarker
        onChange={handleChange}
        pictogram={pictogram}
        position={{
          lat,
          lng,
        }}
      />
    </>
  );
};
