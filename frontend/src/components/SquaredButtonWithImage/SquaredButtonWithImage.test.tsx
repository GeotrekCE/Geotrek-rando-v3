import React from 'react';
import { render } from 'services/testing/reactTestingLibraryWrapper';
import { SquaredButtonWithImage } from './SquaredButtonWithImage';

describe('SquaredButtonWithImage', () => {
  it('renders correctly', () => {
    const squaredButtonWithImage = render(
      <SquaredButtonWithImage imageUrl="imageUrl.jpg" titleKey="map.layerButton.satellite" />,
    );

    expect(squaredButtonWithImage).toMatchSnapshot();
  });
});
