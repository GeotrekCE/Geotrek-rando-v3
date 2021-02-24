import { MutableRefObject, useContext, useEffect, useState } from 'react';
import { DetailsHeaderSection } from '../../useDetails';
import { VisibleSectionContext } from '../../VisibleSectionContext';

export const useDetailsHeader = (sectionsReferences: MutableRefObject<DetailsHeaderSection>) => {
  const [detailsHeaderSection, setDetailsHeaderSection] = useState<DetailsHeaderSection>({});
  const { visibleSection } = useContext(VisibleSectionContext);

  useEffect(() => {
    if (sectionsReferences.current !== undefined && sectionsReferences.current !== null) {
      setDetailsHeaderSection(sectionsReferences.current);
    }
  }, [sectionsReferences.current]);
  return { detailsHeaderSection, currentSectionId: visibleSection };
};
