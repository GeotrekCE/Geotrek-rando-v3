import { useEffect } from 'react';
import { sizes } from 'stylesheet';
import { DetailsSections, DetailsSectionsPosition } from '../useDetails';
import { useVisibleSectionContext } from '../VisibleSectionContext';

/**
 * Returns the id of the section currently on screen
 */
export const useOnScreenSection = ({
  sectionsPositions,
  scrollOffset,
}: {
  sectionsPositions: DetailsSectionsPosition;
  /**
   * Height of the page not taken into account when computing the sections'
   * bounding clients rect. This happens when the container of the sections
   * has a position: relative.
   */
  scrollOffset: number;
}): { visibleSection: DetailsSections | null } => {
  const { visibleSection, setVisibleSection } = useVisibleSectionContext();

  /**
   * Number between 0 and 1, indicates which portion of the screen should
   * the element take to appear on screen. BE CAREFUL it doesn't exactly work as expected
   * So it is recommended to keep it at 1 until it is fixed
   */
  const screenProportionToTriggerElementHighlight = 5 / 5;

  /** Height of the windows minus the headers */
  let visibleScreenHeight = 0;
  // Necessary check because we use Nextjs
  if (typeof window !== 'undefined') {
    visibleScreenHeight = window.innerHeight - sizes.desktopHeader - sizes.detailsHeaderDesktop;
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY -
        scrollOffset +
        (1 - screenProportionToTriggerElementHighlight) * visibleScreenHeight;

      const sectionOnScreen =
        // First check that the scroll position is between the top and bottom of elements
        // It will work most of the time
        (Object.keys(sectionsPositions) as (keyof typeof sectionsPositions)[]).find(sectionId => {
          const positions = sectionsPositions[sectionId];
          if (positions !== undefined) {
            const { top, bottom } = positions;
            if (top === undefined || bottom === undefined) return false;
            return scrollPosition < bottom && scrollPosition > top;
          }
        }) ??
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
