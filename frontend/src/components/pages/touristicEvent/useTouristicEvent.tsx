import { DetailsSectionsPosition } from 'components/pages/details/useDetails';
import { getDimensions } from 'components/pages/details/utils';
import { isUrlString } from 'modules/utils/string';
import { useCallback, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { getTouristicEventDetails } from '../../../modules/touristicEvent/connector';
import { TouristicEventDetails } from '../../../modules/touristicEvent/interface';

export const useTouristicEvent = (
  touristicEventUrl: string | string[] | undefined,
  language: string,
) => {
  const id = isUrlString(touristicEventUrl) ? touristicEventUrl.split('-')[0] : '';
  const path = isUrlString(touristicEventUrl) ? decodeURI(touristicEventUrl) : '';
  const { data, refetch, isLoading } = useQuery<TouristicEventDetails, Error>(
    ['outdoorCourseDetails', id, language],
    () => getTouristicEventDetails(id, language),
    {
      enabled: isUrlString(touristicEventUrl),
    },
  );

  const sectionsReferences = useRef<Record<string, HTMLDivElement | null>>({});
  const [sectionsPositions, setSectionsPositions] = useState<DetailsSectionsPosition>({});

  const useSectionReferenceCallback = (sectionName: string) =>
    useCallback((node: HTMLDivElement | null) => {
      if (node !== null) {
        setTimeout(() => {
          sectionsReferences.current[sectionName] = node;
          setSectionsPositions(currentSectionsPositions => ({
            ...currentSectionsPositions,
            [sectionName]: getDimensions(node),
          }));
        }, 1000);
      }
    }, []);

  const setPreviewRef = useSectionReferenceCallback('preview');
  const setPoisRef = useSectionReferenceCallback('poi');
  const setTouristicContentsRef = useSectionReferenceCallback('touristicContent');

  const [mobileMapState, setMobileMapState] = useState<'DISPLAYED' | 'HIDDEN'>('HIDDEN');
  const displayMobileMap = () => setMobileMapState('DISPLAYED');
  const hideMobileMap = () => setMobileMapState('HIDDEN');

  return {
    id,
    touristicEventContent: data,
    refetch,
    isLoading,
    mobileMapState,
    displayMobileMap,
    hideMobileMap,
    path,
    sectionsReferences,
    sectionsPositions,
    setPreviewRef,
    setPoisRef,
    setTouristicContentsRef,
  };
};
