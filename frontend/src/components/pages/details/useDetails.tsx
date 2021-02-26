import { useQuery } from 'react-query';
import { Details, TrekChild } from 'modules/details/interface';
import { getDetails, getTrekChildren } from 'modules/details/connector';
import { isUrlString } from 'modules/utils/string';
import { useCallback, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { getDimensions } from './utils';

export interface DetailsHeaderSection {
  preview?: HTMLDivElement | null;
  children?: HTMLDivElement | null;
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
  children?: SectionPosition;
  poi?: SectionPosition;
  description?: SectionPosition;
  practicalInformations?: SectionPosition;
  accessibility?: SectionPosition;
  touristicContent?: SectionPosition;
}

export const useDetails = (
  detailsUrl: string | string[] | undefined,
  parentId: string | string[] | undefined,
  language: string,
) => {
  const id = isUrlString(detailsUrl) ? detailsUrl.split('-')[0] : '';
  const path = isUrlString(detailsUrl) ? decodeURI(detailsUrl) : '';
  const { data, refetch, isLoading, error } = useQuery<Details, Error>(
    `details-${id}-${language}`,
    () => getDetails(id, language),
    {
      enabled: isUrlString(detailsUrl),
    },
  );

  const parentIdString = isUrlString(parentId) ? parentId : '';
  const { data: trekFamily } = useQuery<TrekChild[], Error>(
    `trekFamily-${parentIdString}-${language}`,
    () => getTrekChildren(isUrlString(parentId) ? parentId : '', language),
    {
      enabled: isUrlString(parentId),
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

  const setChildrenRef = useCallback((node: HTMLDivElement | null) => {
    const sectionName = 'children';
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

  const intl = useIntl();
  const router = useRouter();

  const [mobileMapState, setMobileMapState] = useState<'DISPLAYED' | 'HIDDEN'>('HIDDEN');
  const displayMobileMap = () => setMobileMapState('DISPLAYED');
  const hideMobileMap = () => setMobileMapState('HIDDEN');

  return {
    id,
    parentIdString,
    details: data,
    trekFamily,
    refetch,
    isLoading,
    error,
    sectionsReferences,
    setPreviewRef,
    setChildrenRef,
    setPoisRef,
    setDescriptionRef,
    setPracticalInformationsRef,
    setTouristicContentsRef,
    setAccessibilityRef,
    sectionsPositions,
    intl,
    router,
    mobileMapState,
    displayMobileMap,
    hideMobileMap,
    path,
  };
};
