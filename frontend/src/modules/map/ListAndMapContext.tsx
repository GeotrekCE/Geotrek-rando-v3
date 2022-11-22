import { createContext, useContext, useState } from 'react';
import { MapResults } from '../mapResults/interface';

export interface ListAndMapContext {
  hoveredCardId: string | null;
  points: MapResults;
  setPoints: (value: MapResults) => void;
  setHoveredCardId: (hoveredCardId: string | null) => void;
}

const listAndMapContext = createContext<ListAndMapContext>({
  hoveredCardId: null,
  points: [],
  setPoints: (value: MapResults) => value,
  setHoveredCardId: (_: string | null) => _,
});

export const useListAndMapContext = () => useContext(listAndMapContext);

export const ListAndMapProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [points, setPoints] = useState<MapResults>([]);

  return (
    <listAndMapContext.Provider value={{ hoveredCardId, setHoveredCardId, points, setPoints }}>
      {children}
    </listAndMapContext.Provider>
  );
};
