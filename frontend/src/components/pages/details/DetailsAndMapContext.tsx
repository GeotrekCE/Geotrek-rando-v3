import { PointGeometry } from 'modules/interface';
import { createContext, useContext, useState } from 'react';

interface DetailsAndMapProps {
  coordinatesReport: PointGeometry | null;
  coordinatesReportTouched: boolean;
  reportVisibility: boolean;
  setCoordinatesReport: React.Dispatch<React.SetStateAction<PointGeometry | null>>;
  setCoordinatesReportTouched: React.Dispatch<React.SetStateAction<boolean>>;
  setReportVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DetailsAndMapContext = createContext<DetailsAndMapProps>({
  coordinatesReport: null,
  coordinatesReportTouched: false,
  reportVisibility: false,
  setCoordinatesReport: pointGeometry => pointGeometry,
  setCoordinatesReportTouched: boolean => boolean,
  setReportVisibility: boolean => boolean,
});

export const useDetailsAndMapContext = () => useContext(DetailsAndMapContext);

export const DetailsAndMapProvider = ({ children }: { children: React.ReactNode }) => {
  const [coordinatesReport, setCoordinatesReport] = useState<PointGeometry | null>(null);
  const [coordinatesReportTouched, setCoordinatesReportTouched] = useState<boolean>(false);
  const [reportVisibility, setReportVisibility] = useState<boolean>(false);

  return (
    <DetailsAndMapContext.Provider
      value={{
        coordinatesReport,
        setCoordinatesReport,
        coordinatesReportTouched,
        reportVisibility,
        setCoordinatesReportTouched,
        setReportVisibility,
      }}
    >
      {children}
    </DetailsAndMapContext.Provider>
  );
};
