import { createContext, useState } from 'react';
import { DetailsSections } from './useDetails';

interface VisibleSection {
  visibleSection: DetailsSections | null;
  setVisibleSection: (sectionId: DetailsSections | null) => void;
}

export const VisibleSectionContext = createContext<VisibleSection>({
  visibleSection: null,
  setVisibleSection: (section: DetailsSections | null) => section,
});

export const VisibleSectionProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [visibleSection, setVisibleSection] = useState<DetailsSections | null>(null);
  return (
    <VisibleSectionContext.Provider value={{ visibleSection, setVisibleSection }}>
      {children}
    </VisibleSectionContext.Provider>
  );
};
