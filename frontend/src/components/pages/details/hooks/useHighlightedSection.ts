import { useEffect, useState } from 'react';
import { DetailsSectionsPosition } from '../useDetails';

export const useHighlightedSection = ({
  sectionsPositions,
  headerHeight,
}: {
  sectionsPositions: DetailsSectionsPosition;
  headerHeight: number;
}) => {
  const [visibleSection, setVisibleSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + headerHeight;

      const sectionOnScreen = (Object.keys(
        sectionsPositions,
      ) as (keyof typeof sectionsPositions)[]).find(sectionId => {
        const positions = sectionsPositions[sectionId];
        if (positions) {
          const { top, bottom } = positions;
          if (top === undefined || bottom === undefined) return false;
          return scrollPosition < bottom && scrollPosition > top;
        }
      });

      if (sectionOnScreen !== visibleSection) {
        setVisibleSection(sectionOnScreen ?? null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionsPositions]);

  return { visibleSection };
};
