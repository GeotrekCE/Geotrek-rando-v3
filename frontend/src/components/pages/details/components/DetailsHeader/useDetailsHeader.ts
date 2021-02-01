import { MutableRefObject, useEffect, useState } from 'react';
import { DetailsHeaderSection } from '../../useDetails';

export const useDetailsHeader = (sectionsReferences: MutableRefObject<DetailsHeaderSection>) => {
  const [detailsHeaderSection, setDetailsHeaderSection] = useState<DetailsHeaderSection>({});

  useEffect(() => {
    if (sectionsReferences.current !== undefined && sectionsReferences.current !== null) {
      setDetailsHeaderSection(sectionsReferences.current);
    }
  }, [sectionsReferences.current]);
  return { detailsHeaderSection };
};
