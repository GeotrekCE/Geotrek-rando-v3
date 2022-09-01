import React from 'react';
import { render } from 'services/testing/reactTestingLibraryWrapper';
import InputWithMagnifier from '.';

describe('InputWithMagnifier', () => {
  it('renders correctly', () => {
    const inputWithMagnifier = render(
      <InputWithMagnifier
        value={null}
        onChange={() => {
          /* does nothing */
        }}
        onButtonClick={() => {
          /* does nothing */
        }}
      />,
    );

    expect(inputWithMagnifier).toMatchSnapshot();
  });
});
