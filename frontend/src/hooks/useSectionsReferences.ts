import { useCallback, useMemo, useRef, useState } from 'react';
import { DetailsSections, DetailsSectionsPosition } from 'components/pages/details/useDetails';
import debounce from 'debounce';
import { getDimensions } from 'components/pages/details/utils';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

const useSectionsReferences = () => {
  const sectionsReferences = useRef<Record<string, HTMLDivElement | null>>({});
  const [sectionsPositions, setSectionsPositions] = useState<Partial<DetailsSectionsPosition>>({});

  const useSectionReferenceCallback = (sectionName: DetailsSections) =>
    useCallback(
      (node: HTMLDivElement | null): void => {
        if (node !== null) {
          sectionsReferences.current[sectionName] = node;
          setSectionsPositions(currentSectionsPositions => ({
            ...currentSectionsPositions,
            [sectionName]: getDimensions(node),
          }));
        }
      },
      [sectionName],
    );

  const handleResize = useMemo(
    () =>
      debounce(
        () => {
          setSectionsPositions(currentSectionsPositions => {
            if (sectionsReferences.current === null) {
              return currentSectionsPositions;
            }
            return Object.entries(sectionsReferences.current).reduce(
              (obj, [name, ref]) => ({
                ...obj,
                [name]: getDimensions(ref),
              }),
              {},
            );
          });
        },
        1000,
        false,
      ),
    [],
  );

  useIsomorphicLayoutEffect(() => {
    global.addEventListener('resize', handleResize);
    global.addEventListener('scroll', handleResize);
    return () => {
      handleResize.clear();
      global.removeEventListener('resize', handleResize);
      global.removeEventListener('scroll', handleResize);
    };
  }, []);

  return {
    sectionsReferences,
    sectionsPositions,
    setSectionsPositions,
    useSectionReferenceCallback,
  };
};

export default useSectionsReferences;
