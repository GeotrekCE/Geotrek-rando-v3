import { createContext, useState } from 'react';
import { DetailsSections } from './useDetails';

interface VisibleSection {
  visibleSection: DetailsSections | null;
  setVisibleSection: (sectionId: DetailsSections | null) => void;
}

export const VisibleSectionContext = createContext<VisibleSection>({
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
