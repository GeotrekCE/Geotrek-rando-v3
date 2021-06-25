import { createContext, useState } from 'react';
import { MapResults } from '../mapResults/interface';

interface ListAndMap {
  hoveredCardId: string | null;
  points: MapResults;
  setPoints: (value: MapResults) => void;
  setHoveredCardId: (hoveredCardId: string | null) => void;
}

export const ListAndMapContext = createContext<ListAndMap>({
  hoveredCardId: null,
  points: [],
  setPoints: (value: MapResults) => value,
  setHoveredCardId: (_: string | null) => _,
});

export const ListAndMapProvider: React.FC = ({ children }) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [points, setPoints] = useState<MapResults>([]);

  return (
    <ListAndMapContext.Provider value={{ hoveredCardId, setHoveredCardId, points, setPoints }}>
      {children}
    </ListAndMapContext.Provider>
  );
};
