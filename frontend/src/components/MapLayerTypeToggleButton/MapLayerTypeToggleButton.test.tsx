import React from 'react';
import { render } from 'services/testing/reactTestingLibraryWrapper';
import { MapLayerTypeToggleButton } from './MapLayerTypeToggleButton';

describe('MapLayerTypeToggleButton', () => {
  it('renders correctly', () => {
    const mapLayerTypeToggleButton = render(
      <MapLayerTypeToggleButton
        onToggleButtonClick={() => {
          return;
        }}
      />,
    );

    expect(mapLayerTypeToggleButton).toMatchSnapshot();
  });
});
