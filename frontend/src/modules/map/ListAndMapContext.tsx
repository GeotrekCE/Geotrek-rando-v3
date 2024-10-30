import { createContext, useContext, useState } from 'react';
import { LatLngBounds } from 'leaflet';
import useBrowserNavigationDetection from 'hooks/useBrowserNavigationDetection';
import { NextRouter } from 'next/router';
import { MapResults } from '../mapResults/interface';

export interface ListAndMapContext {
  hoveredCardId: string | null;
  points: MapResults;
  searchBbox: LatLngBounds | null;
  setPoints: (value: MapResults) => void;
  setHoveredCardId: (hoveredCardId: string | null) => void;
  setSearchBbox: (bbox: LatLngBounds | null) => void;
  isNavigatedByBrowser: boolean;
  previousRouter: NextRouter | null;
}

const listAndMapContext = createContext<ListAndMapContext>({
  hoveredCardId: null,
  points: [],
  searchBbox: null,
  setPoints: (value: MapResults) => value,
  setHoveredCardId: (_: string | null) => _,
  setSearchBbox: (_: LatLngBounds | null) => _,
  isNavigatedByBrowser: false,
  previousRouter: null,
});

export const useListAndMapContext = () => useContext(listAndMapContext);

export const ListAndMapProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [points, setPoints] = useState<MapResults>([]);
  const [searchBbox, setSearchBbox] = useState<LatLngBounds | null>(null);

  const { isNavigatedByBrowser, previousRouter } = useBrowserNavigationDetection();

  return (
    <listAndMapContext.Provider
      value={{
        hoveredCardId,
        setHoveredCardId,
        points,
        setPoints,
        searchBbox,
        setSearchBbox,
        isNavigatedByBrowser,
        previousRouter,
      }}
    >
      {children}
    </listAndMapContext.Provider>
  );
};
