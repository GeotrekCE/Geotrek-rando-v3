import { createContext, useContext, useState } from 'react';
import { DetailsSections } from './useDetails';

interface VisibleSection {
  visibleSection: DetailsSections | null;
  setVisibleSection: (sectionId: DetailsSections | null) => void;
}

const VisibleSectionContext = createContext<VisibleSection>({
  visibleSection: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setVisibleSection: (_: DetailsSections | null) => {},
});

export const VisibleSectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [visibleSection, setVisibleSection] = useState<DetailsSections | null>(null);
  return (
    <VisibleSectionContext.Provider value={{ visibleSection, setVisibleSection }}>
      {children}
    </VisibleSectionContext.Provider>
  );
};

export const useVisibleSectionContext = () => {
  return useContext(VisibleSectionContext);
};
