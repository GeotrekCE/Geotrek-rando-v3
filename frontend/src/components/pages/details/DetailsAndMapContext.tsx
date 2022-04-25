import { LatLngExpression } from 'leaflet';
import { PointGeometry } from 'modules/interface';
import { createContext, useContext, useState } from 'react';

interface DetailsAndMapProps {
  coordinatesReport: PointGeometry | null;
  coordinatesReportTouched: boolean;
  mapCenter: LatLngExpression | null;
  reportVisibility: boolean;
  setCoordinatesReport: React.Dispatch<React.SetStateAction<PointGeometry | null>>;
  setCoordinatesReportTouched: React.Dispatch<React.SetStateAction<boolean>>;
  setReportVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setMapCenter: React.Dispatch<React.SetStateAction<LatLngExpression | null>>;
}

export const DetailsAndMapContext = createContext<DetailsAndMapProps>({
  coordinatesReport: null,
  coordinatesReportTouched: false,
  mapCenter: null,
  reportVisibility: false,
  setCoordinatesReport: pointGeometry => pointGeometry,
  setCoordinatesReportTouched: boolean => boolean,
  setMapCenter: lnglat => lnglat,
  setReportVisibility: boolean => boolean,
});

export const useDetailsAndMapContext = () => useContext(DetailsAndMapContext);

export const DetailsAndMapProvider = ({ children }: { children: React.ReactNode }) => {
  const [coordinatesReport, setCoordinatesReport] = useState<PointGeometry | null>(null);
  const [coordinatesReportTouched, setCoordinatesReportTouched] = useState<boolean>(false);
  const [reportVisibility, setReportVisibility] = useState<boolean>(false);
  const [mapCenter, setMapCenter] = useState<LatLngExpression | null>(null);
  return (
    <DetailsAndMapContext.Provider
      value={{
        coordinatesReport,
        coordinatesReportTouched,
        mapCenter,
        reportVisibility,
        setCoordinatesReport,
        setCoordinatesReportTouched,
        setMapCenter,
        setReportVisibility,
      }}
    >
      {children}
    </DetailsAndMapContext.Provider>
  );
};
