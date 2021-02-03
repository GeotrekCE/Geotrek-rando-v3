import { useQuery } from 'react-query';
import { Details } from 'modules/details/interface';
import { getDetails } from 'modules/details/connector';
import { isUrlString } from 'modules/utils/string';
import { useCallback, useRef, useState } from 'react';
import { getDimensions } from './utils';

export interface DetailsHeaderSection {
  preview?: HTMLDivElement | null;
  poi?: HTMLDivElement | null;
  description?: HTMLDivElement | null;
  practicalInformations?: HTMLDivElement | null;
  accessibility?: HTMLDivElement | null;
  touristicContent?: HTMLDivElement | null;
}

export type DetailsSections = keyof DetailsHeaderSection;

interface SectionPosition {
  top: number;
  bottom: number;
}

export interface DetailsSectionsPosition {
  preview?: SectionPosition;
  poi?: SectionPosition;
  description?: SectionPosition;
  practicalInformations?: SectionPosition;
  accessibility?: SectionPosition;
  touristicContent?: SectionPosition;
}

export const useDetails = (detailsUrl: string | string[] | undefined) => {
  const id = isUrlString(detailsUrl) ? detailsUrl.split('-')[1] : '';
  const { data, refetch, isLoading } = useQuery<Details, Error>(
    `details-${id}`,
    () => getDetails(id),
    {
      enabled: isUrlString(detailsUrl),
    },
  );

  const sectionsReferences = useRef<DetailsHeaderSection>({});
  const [sectionsPositions, setSectionsPositions] = useState<DetailsSectionsPosition>({});

  const setPreviewRef = useCallback((node: HTMLDivElement | null) => {
    const sectionName = 'preview';
    if (node !== null) {
      sectionsReferences.current[sectionName] = node;
      setSectionsPositions(currentSectionsPositions => ({
        ...currentSectionsPositions,
        [sectionName]: getDimensions(node),
      }));
    }
  }, []);

  const setPoisRef = useCallback((node: HTMLDivElement | null) => {
    const sectionName = 'poi';
    if (node !== null) {
      sectionsReferences.current[sectionName] = node;
      setSectionsPositions(currentSectionsPositions => ({
        ...currentSectionsPositions,
        [sectionName]: getDimensions(node),
      }));
    }
  }, []);

  const setDescriptionRef = useCallback((node: HTMLDivElement | null) => {
    const sectionName = 'description';
    if (node !== null) {
      sectionsReferences.current[sectionName] = node;
      setSectionsPositions(currentSectionsPositions => ({
        ...currentSectionsPositions,
        [sectionName]: getDimensions(node),
      }));
    }
  }, []);

  const setPracticalInformationsRef = useCallback((node: HTMLDivElement | null) => {
    const sectionName = 'practicalInformations';
    if (node !== null) {
      sectionsReferences.current[sectionName] = node;
      setSectionsPositions(currentSectionsPositions => ({
        ...currentSectionsPositions,
        [sectionName]: getDimensions(node),
      }));
    }
  }, []);

  const setAccessibilityRef = useCallback((node: HTMLDivElement | null) => {
    const sectionName = 'accessibility';
    if (node !== null) {
      sectionsReferences.current[sectionName] = node;
      setSectionsPositions(currentSectionsPositions => ({
        ...currentSectionsPositions,
        [sectionName]: getDimensions(node),
      }));
    }
  }, []);

  const setTouristicContentsRef = useCallback((node: HTMLDivElement | null) => {
    const sectionName = 'touristicContent';
    if (node !== null) {
      sectionsReferences.current[sectionName] = node;
      setSectionsPositions(currentSectionsPositions => ({
        ...currentSectionsPositions,
        [sectionName]: getDimensions(node),
      }));
    }
  }, []);

  return {
    details: data,
    refetch,
    isLoading,
    sectionsReferences,
    setPreviewRef,
    setPoisRef,
    setDescriptionRef,
    setPracticalInformationsRef,
    setTouristicContentsRef,
    setAccessibilityRef,
    sectionsPositions,
  };
};
