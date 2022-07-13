import React from 'react';
import { MapContainer } from 'react-leaflet';
import { render } from 'services/testing/reactTestingLibraryWrapper';
import { MapLayerTypeToggleButton } from './MapLayerTypeToggleButton';

jest.mock('components/Map/config', () => ({
  getMapConfig: () => ({
    mapSatelliteLayerUrl: 'satelliteURL',
  }),
}));

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
