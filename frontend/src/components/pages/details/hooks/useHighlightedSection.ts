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

      const sectionOnScreen =
        // First check that the scroll position is between the top and bottom of elements
        // It will work most of the time
        (Object.keys(sectionsPositions) as (keyof typeof sectionsPositions)[]).find(sectionId => {
          const positions = sectionsPositions[sectionId];
          if (positions) {
            const { top, bottom } = positions;
            if (top === undefined || bottom === undefined) return false;
            return scrollPosition < bottom && scrollPosition > top;
          }
        }) ||
        // If nothing has been found previously there might still be something on the screen but the scroll position is not above the bottom of it
        // This happens at the end of the screen for example, therefore we just try to find the first element whose top is above scroll position (ie starts to appear on screen)
        (Object.keys(sectionsPositions) as (keyof typeof sectionsPositions)[]).find(sectionId => {
          const positions = sectionsPositions[sectionId];
          if (positions) {
            const { top, bottom } = positions;
            if (top === undefined || bottom === undefined) return false;
            return scrollPosition < top;
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
