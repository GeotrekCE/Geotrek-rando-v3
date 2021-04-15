import React from 'react';
import { render } from 'services/testing/reactTestingLibraryWrapper';
import { MapLayerTypeToggleButton } from './MapLayerTypeToggleButton';

describe('MapLayerTypeToggleButton', () => {
  it('renders correctly', () => {
    const mapLayerTypeToggleButton = render(
      <MapLayerTypeToggleButton
        selectedTileLayerType="classic"
        onToggleButtonClick={() => {
          /* does nothing */
        }}
      />,
    );

    expect(mapLayerTypeToggleButton).toMatchSnapshot();
  });

  test.each`
    selectedTileLayerType | expectedTileLayerTypeTitle
    ${'classic'}          | ${'Satellite'}
    ${'satellite'}        | ${'Plan'}
  `('renders correctly', ({ selectedTileLayerType, expectedTileLayerTypeTitle }) => {
    const mapLayerTypeToggleButton = render(
      <MapLayerTypeToggleButton
        selectedTileLayerType={selectedTileLayerType}
        onToggleButtonClick={() => {
          /* does nothing */
        }}
      />,
    );

    const title = mapLayerTypeToggleButton.queryByText(expectedTileLayerTypeTitle);

    expect(title).toBeTruthy();
  });
});
