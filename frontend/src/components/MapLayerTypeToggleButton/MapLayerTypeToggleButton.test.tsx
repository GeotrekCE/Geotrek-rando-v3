import { MapContainer } from 'react-leaflet';
import { render } from 'services/testing/reactTestingLibraryWrapper';
import { CustomControlProps } from 'components/Map/components/CustomControl';
import { MapLayerTypeToggleButton } from './MapLayerTypeToggleButton';

jest.mock('components/Map/config', () => ({
  getMapConfig: () => ({
    mapSatelliteLayerUrl: 'satelliteURL',
  }),
}));

jest.mock(
  'components/Map/components/CustomControl',
  () =>
    function CustomControl(props: CustomControlProps) {
      return <div className="leaflet-control-container" {...props} />;
    },
);

describe('MapLayerTypeToggleButton', () => {
  it('renders correctly', () => {
    const mapLayerTypeToggleButton = render(
      <MapContainer attributionControl={false} zoomControl={false}>
        <MapLayerTypeToggleButton onChange={() => null} />
      </MapContainer>,
    );

    expect(mapLayerTypeToggleButton).toMatchSnapshot();
  });
});
