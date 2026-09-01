import React from 'react';
import { render } from 'services/testing/reactTestingLibraryWrapper';
import { VigilanceAreaGeometry } from 'modules/vigilanceArea/adapter';
import { VigilanceAreas } from '../VigilanceAreas';

jest.mock('react-leaflet', () => {
  const ReactActual = jest.requireActual('react');
  const MockMarker = ReactActual.forwardRef(function MockMarker(
    props: { children?: React.ReactNode },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ref: unknown,
  ) {
    return <div data-testid="leaflet-marker">{props.children}</div>;
  });

  return {
    Polygon: ({ children, pathOptions }: { children?: React.ReactNode; pathOptions: { color: string } }) => (
      <div data-testid="leaflet-polygon" data-color={pathOptions.color}>
        {children}
      </div>
    ),
    Marker: MockMarker,
    Popup: ({ children }: { children?: React.ReactNode }) => <div data-testid="leaflet-popup">{children}</div>,
  };
});

describe('VigilanceAreas Leaflet Map Component', () => {
  it('renders nothing when contents is undefined or empty', () => {
    const { container } = render(<VigilanceAreas contents={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders Polygon and Popup for VigilanceAreaGeometry contents', () => {
    const mockContents = [
      {
        id: '9',
        name: 'Nidification Cigogne',
        colorHex: '#901A1A',
        levelMode: 'closed' as const,
        typeName: 'Faune',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [1.32, 43.61],
              [1.39, 43.58],
              [1.38, 43.56],
              [1.32, 43.61],
            ],
          ],
        },
      },
    ];

    const { getByTestId, getByText } = render(<VigilanceAreas contents={mockContents} />);

    const polygon = getByTestId('leaflet-polygon');
    expect(polygon).toBeInTheDocument();
    expect(polygon).toHaveAttribute('data-color', '#901A1A');

    expect(getByText(/Faune/)).toBeInTheDocument();
    expect(getByText('Nidification Cigogne')).toBeInTheDocument();
  });

  it('correctly handles adapted { x, y } coordinates without NaN error', () => {
    const mockContents = [
      {
        id: '10',
        name: 'Chasse en battue',
        colorHex: '#C56600',
        levelMode: 'vigilance' as const,
        typeName: 'Chasse',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              { x: 1.32, y: 43.61 },
              { x: 1.39, y: 43.58 },
              { x: 1.38, y: 43.56 },
              { x: 1.32, y: 43.61 },
            ],
          ],
        },
      },
    ];

    const { getByTestId, getByText } = render(
      <VigilanceAreas contents={(mockContents as unknown) as VigilanceAreaGeometry[]} />,
    );

    const polygon = getByTestId('leaflet-polygon');
    expect(polygon).toBeInTheDocument();
    expect(polygon).toHaveAttribute('data-color', '#C56600');
    expect(getByText('Chasse en battue')).toBeInTheDocument();
  });
});
