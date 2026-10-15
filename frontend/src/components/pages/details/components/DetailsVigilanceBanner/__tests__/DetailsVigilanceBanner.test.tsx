import { render } from 'services/testing/reactTestingLibraryWrapper';
import { VigilanceArea } from 'modules/vigilanceArea/interface';
import { DetailsVigilanceBanner } from '../DetailsVigilanceBanner';

describe('DetailsVigilanceBanner', () => {
  const baseVigilanceArea: VigilanceArea = {
    id: 'area-1',
    name: 'Battue aux sangliers',
    geometry: { type: 'Polygon', coordinates: [] },
    type: { id: 'type-1', name: 'Chasse', pictogramUrl: '/chasse.svg' },
    level: { id: 'level-1', level: 1, name: 'Danger', color: '#E1000F', pictogramUrl: null },
    isImpracticable: false,
    periods: [
      {
        startDate: '2020-01-01',
        endDate: '2099-12-31',
        activeDays: [],
        annual: false,
      },
    ],
  };

  it('renders nothing when there are no vigilance areas and not impracticable', () => {
    const { container } = render(
      <DetailsVigilanceBanner publishedVigilanceAreas={[]} isImpracticable={false} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  describe('Priority 1 — Impraticabilité en cours', () => {
    it('renders Priority 1 banner when isImpracticable is true', () => {
      const component = render(<DetailsVigilanceBanner isImpracticable />);
      const bannerElement = component.container.querySelector('#details_vigilanceBanner');

      expect(bannerElement).toHaveAttribute('data-priority', 'p1');
      expect(bannerElement).toHaveAttribute('data-encart-level', 'fermeture');
      expect(component.getByText('Cet itinéraire est actuellement impraticable.')).toBeInTheDocument();
      expect(
        component.getByText(
          'Consultez la section « Zones de vigilance » pour en savoir plus sur les dates et conditions de praticabilité de vos activités.',
        ),
      ).toBeInTheDocument();
    });

    it('renders Priority 1 banner with "Cette zone" for touristic content', () => {
      const component = render(
        <DetailsVigilanceBanner isImpracticable contentType="TOURISTIC_CONTENT" />,
      );
      expect(component.getByText('Cette zone est actuellement impraticable.')).toBeInTheDocument();
    });

    it('renders Priority 1 banner when a vigilance area is isImpracticable=true and active today', () => {
      const closedActiveArea: VigilanceArea = {
        ...baseVigilanceArea,
        isImpracticable: true,
      };
      const component = render(
        <DetailsVigilanceBanner publishedVigilanceAreas={[closedActiveArea]} />,
      );
      const bannerElement = component.container.querySelector('#details_vigilanceBanner');
      expect(bannerElement).toHaveAttribute('data-priority', 'p1');
    });
  });

  describe('Priority 2 — Vigilance haute en cours', () => {
    it('renders single zone variant when only 1 active high vigilance area is present', () => {
      const component = render(
        <DetailsVigilanceBanner publishedVigilanceAreas={[baseVigilanceArea]} />,
      );
      const bannerElement = component.container.querySelector('#details_vigilanceBanner');

      expect(bannerElement).toHaveAttribute('data-priority', 'p2');
      expect(bannerElement).toHaveAttribute('data-encart-level', 'alert');
      expect(
        component.getByText(/Attention : cet itinéraire est concerné par une zone de vigilance élevée : Chasse - Danger - Battue aux sangliers/i),
      ).toBeInTheDocument();
    });

    it('renders single zone variant with "Cette zone" for touristic content', () => {
      const component = render(
        <DetailsVigilanceBanner
          publishedVigilanceAreas={[baseVigilanceArea]}
          contentType="TOURISTIC_CONTENT"
        />,
      );
      expect(
        component.getByText(/Attention : cette zone est concernée par une zone de vigilance élevée : Chasse - Danger - Battue aux sangliers/i),
      ).toBeInTheDocument();
    });

    it('renders multi-zone text when multiple areas are present', () => {
      const secondArea: VigilanceArea = {
        ...baseVigilanceArea,
        id: 'area-2',
        name: 'Zone 2',
      };
      const component = render(
        <DetailsVigilanceBanner publishedVigilanceAreas={[baseVigilanceArea, secondArea]} />,
      );
      const bannerElement = component.container.querySelector('#details_vigilanceBanner');

      expect(bannerElement).toHaveAttribute('data-priority', 'p2');
      expect(
        component.getByText('Attention : cet itinéraire est concerné par au moins une zone de vigilance élevée.'),
      ).toBeInTheDocument();
    });
  });

  describe('Priority 3 — Impraticabilité à venir', () => {
    it('renders Priority 3 banner when area is closed in the future (not active today)', () => {
      const futureClosedArea: VigilanceArea = {
        ...baseVigilanceArea,
        isImpracticable: true,
        periods: [
          {
            startDate: '2099-01-01',
            endDate: '2099-12-31',
            activeDays: [],
            annual: false,
          },
        ],
      };
      const component = render(
        <DetailsVigilanceBanner publishedVigilanceAreas={[futureClosedArea]} />,
      );
      const bannerElement = component.container.querySelector('#details_vigilanceBanner');

      expect(bannerElement).toHaveAttribute('data-priority', 'p3');
      expect(bannerElement).toHaveAttribute('data-encart-level', 'vigilance');
      expect(
        component.getByText("Cet itinéraire peut être impraticable à certaines périodes de l'année."),
      ).toBeInTheDocument();
      expect(
        component.getByText(
          'Consultez la section « Zones de vigilance » pour en savoir plus sur les dates et conditions de praticabilité de vos activités.',
        ),
      ).toBeInTheDocument();
    });

    it('renders Priority 3 banner with "Cette zone" for touristic content', () => {
      const futureClosedArea: VigilanceArea = {
        ...baseVigilanceArea,
        isImpracticable: true,
        periods: [
          {
            startDate: '2099-01-01',
            endDate: '2099-12-31',
            activeDays: [],
            annual: false,
          },
        ],
      };
      const component = render(
        <DetailsVigilanceBanner
          publishedVigilanceAreas={[futureClosedArea]}
          contentType="TOURISTIC_CONTENT"
        />,
      );
      expect(
        component.getByText("Cette zone peut être impraticable à certaines périodes de l'année."),
      ).toBeInTheDocument();
    });
  });

  describe('Priority 4 — Vigilance haute ou moyenne à venir', () => {
    it('renders Priority 4 banner when high/medium vigilance area is only in the future', () => {
      const futureAlertArea: VigilanceArea = {
        ...baseVigilanceArea,
        isImpracticable: false,
        periods: [
          {
            startDate: '2099-01-01',
            endDate: '2099-12-31',
            activeDays: [],
            annual: false,
          },
        ],
      };
      const component = render(
        <DetailsVigilanceBanner publishedVigilanceAreas={[futureAlertArea]} />,
      );
      const bannerElement = component.container.querySelector('#details_vigilanceBanner');

      expect(bannerElement).toHaveAttribute('data-priority', 'p4');
      expect(bannerElement).toHaveAttribute('data-encart-level', 'vigilance');
      expect(
        component.getByText(/Attention : cet itinéraire est concerné par une zone de vigilance élevée : Chasse - Danger - Battue aux sangliers/i),
      ).toBeInTheDocument();
    });
  });

  describe('Priority 5 — Texte par défaut', () => {
    it('renders default Priority 5 banner when area has low/info level or no critical level', () => {
      const infoArea: VigilanceArea = {
        ...baseVigilanceArea,
        level: { id: 'level-3', level: 3, name: 'Conseil', color: '#1257A8', pictogramUrl: null },
        criticality: 'info',
        isImpracticable: false,
      };
      const component = render(
        <DetailsVigilanceBanner publishedVigilanceAreas={[infoArea]} />,
      );
      const bannerElement = component.container.querySelector('#details_vigilanceBanner');

      expect(bannerElement).toHaveAttribute('data-priority', 'p5');
      expect(
        component.getByText('Cet itinéraire peut comporter des zones de vigilance.'),
      ).toBeInTheDocument();
      expect(
        component.getByText(
          "Consultez la section « Zones de vigilance » pour en savoir plus sur les conditions d'accès et bons comportements à adopter dans vos activités.",
        ),
      ).toBeInTheDocument();
    });

    it('renders Priority 5 banner with "Cette zone" for touristic content', () => {
      const infoArea: VigilanceArea = {
        ...baseVigilanceArea,
        level: null,
        criticality: 'info',
        isImpracticable: false,
      };
      const component = render(
        <DetailsVigilanceBanner
          publishedVigilanceAreas={[infoArea]}
          contentType="TOURISTIC_CONTENT"
        />,
      );
      expect(
        component.getByText('Cette zone peut comporter des zones de vigilance.'),
      ).toBeInTheDocument();
    });
  });

  describe('Fallback without level information', () => {
    it('skips P2 and P4 to evaluate P1 -> P3 -> P5 directly', () => {
      const areaWithoutLevel: VigilanceArea = {
        ...baseVigilanceArea,
        level: null,
        criticality: null,
        isImpracticable: false,
      };
      const component = render(
        <DetailsVigilanceBanner publishedVigilanceAreas={[areaWithoutLevel]} />,
      );
      const bannerElement = component.container.querySelector('#details_vigilanceBanner');
      expect(bannerElement).toHaveAttribute('data-priority', 'p5');
    });
  });

  describe('Priority precedence', () => {
    it('Priority 1 takes precedence over Priority 2', () => {
      const activeDangerArea: VigilanceArea = {
        ...baseVigilanceArea,
        id: 'area-danger',
        isImpracticable: false,
      };
      const activeClosedArea: VigilanceArea = {
        ...baseVigilanceArea,
        id: 'area-closed',
        isImpracticable: true,
      };
      const component = render(
        <DetailsVigilanceBanner
          publishedVigilanceAreas={[activeDangerArea, activeClosedArea]}
        />,
      );
      const bannerElement = component.container.querySelector('#details_vigilanceBanner');
      expect(bannerElement).toHaveAttribute('data-priority', 'p1');
    });
  });
});
