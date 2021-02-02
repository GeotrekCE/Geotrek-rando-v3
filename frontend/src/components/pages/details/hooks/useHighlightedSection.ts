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

  const sections = (Object.keys(sectionsPositions) as (keyof typeof sectionsPositions)[]).reduce<
    { section: string; positions: { top: number; bottom: number } | undefined }[]
  >(
    (prev, sectionName) => [
      ...prev,
      { section: sectionName, positions: sectionsPositions[sectionName] },
    ],
    [],
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + headerHeight;

      const sectionOnScreen = sections.find(({ positions }) => {
        if (positions) {
          const { top, bottom } = positions;
          if (top === undefined || bottom === undefined) return false;
          return scrollPosition < bottom && scrollPosition > top;
        }
      });

      if (sectionOnScreen && sectionOnScreen.section !== visibleSection) {
        setVisibleSection(sectionOnScreen.section);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  return { visibleSection };
};
