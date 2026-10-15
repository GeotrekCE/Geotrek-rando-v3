import { fireEvent } from '@testing-library/react';
import { render } from 'services/testing/reactTestingLibraryWrapper';
import { DetailsAndMapProvider } from 'components/pages/details/DetailsAndMapContext';
import { VigilanceArea } from 'modules/vigilanceArea/interface';
import { VigilanceAreaItem } from '../VigilanceAreaItem';
import { VigilanceAreaBadge } from '../VigilanceAreaBadge';

describe('VigilanceAreaItem', () => {
  const baseVigilanceArea: VigilanceArea = {
    id: 'area-1',
    name: 'Zone Test Alpha',
    geometry: { type: 'Polygon', coordinates: [] },
    type: { id: 'type-1', name: 'Travaux forestiers', pictogramUrl: '/forest.svg' },
    level: { id: 'level-1', level: 1, name: 'Danger', color: '#ff8800', pictogramUrl: null },
    isImpracticable: false,
    periods: [
      {
        startDate: '2026-06-01',
        endDate: '2026-09-30',
        activeDays: [],
        annual: false,
      },
    ],
    updateDatetime: '2026-04-10T10:00:00Z',
  };

  it('renders API level name in collapsed header when practicable', () => {
    const component = render(
      <DetailsAndMapProvider>
        <VigilanceAreaItem area={baseVigilanceArea} />
      </DetailsAndMapProvider>,
    );

    expect(component.getByText('Danger — Travaux forestiers')).toBeInTheDocument();
    expect(component.getByText('Zone Test Alpha')).toBeInTheDocument();
  });

  it('renders "Impraticable" in strict red #901A1A when impracticable, ignoring level color', () => {
    const impracticableArea: VigilanceArea = {
      ...baseVigilanceArea,
      isImpracticable: true,
      level: { id: 'level-1', level: 1, name: 'Danger', color: '#ff8800', pictogramUrl: null },
    };

    const component = render(
      <DetailsAndMapProvider>
        <VigilanceAreaItem area={impracticableArea} />
      </DetailsAndMapProvider>,
    );

    const headerLevelElement = component.getByText('Impraticable — Travaux forestiers');
    expect(headerLevelElement).toBeInTheDocument();
    expect(headerLevelElement).toHaveStyle({ color: '#901A1A' });
  });

  it('displays summary message in collapsed header when multiple periods exist', () => {
    const multiPeriodArea: VigilanceArea = {
      ...baseVigilanceArea,
      periods: [
        { startDate: '2026-05-01', endDate: '2026-06-01', activeDays: [], annual: false },
        { startDate: '2026-09-01', endDate: '2026-10-01', activeDays: [], annual: false },
      ],
    };

    const component = render(
      <DetailsAndMapProvider>
        <VigilanceAreaItem area={multiPeriodArea} />
      </DetailsAndMapProvider>,
    );

    expect(
      component.getByText(
        "Plusieurs périodes concernées au cours de l'année, consulter le détail pour plus de précisions",
      ),
    ).toBeInTheDocument();
  });

  it('expands accordion and displays detail section with practicability, periods list and update date', () => {
    const multiPeriodAnnualArea: VigilanceArea = {
      ...baseVigilanceArea,
      isImpracticable: false,
      periods: [
        { startDate: '2026-05-15', endDate: '2026-06-15', activeDays: [], annual: true },
        { startDate: '2026-09-01', endDate: '2026-10-31', activeDays: [], annual: false },
      ],
    };

    const component = render(
      <DetailsAndMapProvider>
        <VigilanceAreaItem area={multiPeriodAnnualArea} />
      </DetailsAndMapProvider>,
    );

    const headerButton = component.getByRole('button');
    fireEvent.click(headerButton);

    expect(component.getByText('Praticabilité :')).toBeInTheDocument();
    expect(component.getByText('Praticable')).toBeInTheDocument();
    expect(component.getByText(/Chaque année/)).toBeInTheDocument();
    expect(component.getByText(/Dernière mise à jour le/)).toBeInTheDocument();
  });
});

describe('VigilanceAreaBadge', () => {
  it('renders type pictogram when provided (Priority 1)', () => {
    const component = render(
      <VigilanceAreaBadge
        typePictogramUrl="/custom-type.svg"
        levelPictogramUrl="/level.svg"
        isImpracticable
      />,
    );
    const imageElement = component.container.querySelector('img');
    expect(imageElement).toHaveAttribute('src', '/custom-type.svg');
  });

  it('renders level pictogram when type pictogram is not provided (Priority 2)', () => {
    const component = render(
      <VigilanceAreaBadge
        typePictogramUrl={null}
        levelPictogramUrl="/custom-level.svg"
        isImpracticable
      />,
    );
    const imageElement = component.container.querySelector('img');
    expect(imageElement).toHaveAttribute('src', '/custom-level.svg');
  });

  it('renders AlertTriangle in red when impracticable and no pictograms provided (Priority 3)', () => {
    const component = render(
      <VigilanceAreaBadge
        typePictogramUrl={null}
        levelPictogramUrl={null}
        isImpracticable
      />,
    );
    const svgElement = component.container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    const pathElement = component.container.querySelector('path');
    expect(pathElement).toHaveAttribute('fill', 'var(--color-vigilance-closed, #901A1A)');
  });

  it('renders orange exclamation mark when practicable and no pictograms provided (Priority 3)', () => {
    const component = render(
      <VigilanceAreaBadge
        typePictogramUrl={null}
        levelPictogramUrl={null}
        isImpracticable={false}
      />,
    );
    const svgElement = component.container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('stroke', '#d17a00');
  });
});
