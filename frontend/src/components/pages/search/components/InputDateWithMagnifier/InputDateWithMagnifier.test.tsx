import React from 'react';
import { render } from 'services/testing/reactTestingLibraryWrapper';
import InputDateWithMagnifier from '.';

describe('InputDateWithMagnifier', () => {
  it('renders correctly', () => {
    const inputDateWithMagnifier = render(
      <InputDateWithMagnifier
        value={null}
        onButtonClick={() => {
          /* does nothing */
        }}
      />,
    );

    expect(InputDateWithMagnifier).toMatchSnapshot();
  });
});
