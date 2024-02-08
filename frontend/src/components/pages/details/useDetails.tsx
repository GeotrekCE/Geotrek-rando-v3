import { useQuery } from '@tanstack/react-query';
import { Details, TrekFamily } from 'modules/details/interface';
import { getDetails, getTrekFamily } from 'modules/details/connector';
import { isUrlString } from 'modules/utils/string';
import { ONE_DAY } from 'services/constants/staleTime';
import { isRessourceMissing } from 'services/routeUtils';
import { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { routes } from 'services/routes';
import { useMediaPredicate } from 'react-media-hook';
import useSectionsReferences from 'hooks/useSectionsReferences';
import { queryCommonDictionaries } from 'modules/dictionaries/api';
import { getDetailsConfig } from './config';
import {
  DetailsSectionOutdoorCourseNames,
  DetailsSectionOutdoorSiteNames,
  DetailsSectionTouristicContentNames,
  DetailsSectionTouristicEventNames,
  DetailsSectionTrekNames,
} from './interface';

export type DetailsHeaderSection = Record<string, HTMLDivElement | null>;

export type DetailsSections =
  | DetailsSectionTrekNames
  | DetailsSectionTouristicContentNames
  | DetailsSectionTouristicEventNames
  | DetailsSectionOutdoorSiteNames
  | DetailsSectionOutdoorCourseNames;

interface SectionPosition {
  top: number;
  bottom: number;
}

export type DetailsSectionsPosition = Record<Partial<DetailsSections>, Partial<SectionPosition>>;

export const useDetails = (
  slug: string | string[] | undefined,
  parentId: string | string[] | undefined,
  language: string,
) => {
  const id = isUrlString(slug) ? slug.split('-')[0] : '';
  const path = isUrlString(slug) ? decodeURI(slug) : '';
  const router = useRouter();

  const commonDictionaries = queryCommonDictionaries(language);

  const {
    data: details,
    refetch,
    isLoading,
  } = useQuery<Details, Error>(
    ['details', id, language],
    () => getDetails(id, language, commonDictionaries),
    {
      enabled: isUrlString(slug) && commonDictionaries !== undefined,
      onError: async error => {
        if (isRessourceMissing(error)) {
          await router.push(routes.HOME);
        }
      },
      staleTime: ONE_DAY,
    },
  );

  const isMobile = useMediaPredicate('(max-width: 1024px)');

  const parentIdString = isUrlString(parentId) ? parentId : '';
  const { data: trekFamily } = useQuery<TrekFamily | null, Error>(
    ['trekFamily', parentIdString, language],
    () => getTrekFamily(isUrlString(parentId) ? parentId : '', language),
    {
      enabled: isUrlString(parentId),
      staleTime: ONE_DAY,
    },
  );

  const { sections } = getDetailsConfig(language);

  const sectionsTrek = sections.trek.filter(({ display }) => display === true);

  const { sectionsReferences, sectionsPositions, useSectionReferenceCallback } =
    useSectionsReferences();

  const sectionRef = sectionsTrek.reduce(
    (list, item) => ({ ...list, [item.name]: useSectionReferenceCallback(item.name) }),
    {} as Record<DetailsSections, (node: HTMLDivElement | null) => void>,
  );

  const intl = useIntl();

  // "default" is the world; reals "id" are related to HD viewpoints ids
  const [mapId, setMapId] = useState<string>('default');
  const [mobileMapState, setMobileMapState] = useState<'DISPLAYED' | 'HIDDEN' | null>('HIDDEN');
  const displayMobileMap = useCallback(() => setMobileMapState('DISPLAYED'), [setMobileMapState]);
  const hideMobileMap = useCallback(() => setMobileMapState('HIDDEN'), [setMobileMapState]);

  useEffect(() => {
    if (!isMobile) {
      setMobileMapState(prevMobileMapState => {
        if (prevMobileMapState === 'DISPLAYED') {
          return 'HIDDEN';
        }
        return null;
      });
    }
  }, [setMobileMapState, isMobile]);

  return {
    id,
    details,
    trekFamily,
    refetch,
    isLoading,
    sectionsReferences,
    sectionsPositions,
    intl,
    mobileMapState,
    displayMobileMap,
    hideMobileMap,
    path,
    sectionRef,
    mapId,
    setMapId,
  };
};
