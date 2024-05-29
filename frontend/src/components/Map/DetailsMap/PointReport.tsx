import { renderToStaticMarkup } from 'react-dom/server';
import 'leaflet/dist/leaflet.css';
import { useDetailsAndMapContext } from 'components/pages/details/DetailsAndMapContext';
import { AlertCircle } from 'components/Icons/AlertCircle';
import { Icon, LatLngLiteral } from 'leaflet';
import { useMapEvents } from 'react-leaflet';
import { FormattedMessage } from 'react-intl';
import { useMediaPredicate } from 'react-media-hook';
import { DraggableMarker } from '../components/DraggableMarker';
import { TrekMarker } from '../Markers/TrekMarker';
import { theme } from '../../../../tailwind.config';

export const PointReport: React.FC = () => {
  const {
    coordinatesReport,
    coordinatesReportTouched,
    setCoordinatesReport,
    setCoordinatesReportTouched,
  } = useDetailsAndMapContext();

  const isMobile = useMediaPredicate('(max-width: 1024px)');

  useMapEvents({
    click: ({ latlng }: { latlng: LatLngLiteral }) => {
      handleChange(latlng);
    },
  });

  if (coordinatesReport === null) {
    return null;
  }

  const pictogram = TrekMarker(
    renderToStaticMarkup(<AlertCircle color="white" />),
    1.5,
    theme.extend.colors.red,
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

  const {
    coordinates: { x: lng, y: lat },
  } = coordinatesReport;
  return (
    <>
      {(!coordinatesReportTouched || !isMobile) && (
        <div className="text-sm absolute top-6 left-1/2 -translate-x-1/2 z-10 py-2 desktop:py-3 px-3 desktop:px-3 rounded-2xl border-2 border-solid border-red bg-white z-mapButton">
          <p className="flex gap-2 text-red">
            <AlertCircle className="shrink-0" size={24} />
            <span>
              <FormattedMessage id="report.mapButton.create" />
            </span>
          </p>
        </div>
      )}
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
