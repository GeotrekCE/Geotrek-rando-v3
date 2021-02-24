import { createContext, useState } from 'react';

interface ListAndMap {
  hoveredCardId: string | null;
  setHoveredCardId: (hoveredCardId: string | null) => void;
}

export const ListAndMapContext = createContext<ListAndMap>({
  hoveredCardId: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setHoveredCardId: (_: string | null) => {},
});

export const ListAndMapProvider = ({ children }: { children: React.ReactNode }) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  return (
    <ListAndMapContext.Provider value={{ hoveredCardId, setHoveredCardId }}>
      {children}
    </ListAndMapContext.Provider>
  );
};
