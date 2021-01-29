import { useQuery } from 'react-query';
import { Details } from 'modules/details/interface';
import { getDetails } from 'modules/details/connector';
import { useEffect, useRef, useState } from 'react';

const isUrlString = (url: string | string[] | undefined): url is string =>
  url !== undefined && typeof url === 'string';

interface DetailsHeaderSection {
  preview?: HTMLDivElement | null;
  poi?: HTMLDivElement | null;
  description?: HTMLDivElement | null;
  practicalInformations?: HTMLDivElement | null;
  accessibility?: HTMLDivElement | null;
  toSee?: HTMLDivElement | null;
}

const getDimensions = (ele: HTMLDivElement) => {
  const { height } = ele.getBoundingClientRect();
  const offsetTop = ele.offsetTop;
  const offsetBottom = offsetTop + height;
  return {
    height,
    offsetTop,
    offsetBottom,
  };
};

export const scrollTo = (ele: HTMLDivElement): void => {
  ele.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

export const useDetails = (detailsUrl: string | string[] | undefined) => {
  const id = isUrlString(detailsUrl) ? detailsUrl.split('-')[1] : '';
  const { data, refetch } = useQuery<Details, Error>('details', () => getDetails(id), {
    enabled: isUrlString(detailsUrl),
  });

  const sectionRefs = useRef<DetailsHeaderSection>({});
  const [visibleSection, setVisibleSection] = useState<keyof DetailsHeaderSection | undefined>(
    undefined,
  );

  useEffect(() => {
    const handleScroll = () => {
      const selected = Object.entries(sectionRefs).find(([, ref]) => {
        const element = ref.current;
        if (element !== null && element !== undefined) {
          const { offsetBottom, offsetTop } = getDimensions(element);
          return window.scrollY > offsetTop && window.scrollY < offsetBottom;
        }
      });

      if (selected !== undefined && selected[0] !== visibleSection) {
        console.log('arriving to', visibleSection);
        setVisibleSection(selected[0]);
      } else if (selected === undefined && visibleSection !== undefined) {
        setVisibleSection(undefined);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleSection]);

  return { details: data, refetch, sectionRefs };
};
