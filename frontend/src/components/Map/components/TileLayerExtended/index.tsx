import L, { LayerOptions } from 'leaflet';
import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet-boundary-canvas';

interface TileLayerExtendedProps {
  url: string;
  bounds?: string;
  options?: LayerOptions;
}

const getBoundary = async (geoJSONUrl: string) => {
  try {
    return fetch(geoJSONUrl).then(response => response.json());
  } catch {
    return null;
  }
};

const TileLayerExtended: React.FC<TileLayerExtendedProps> = ({ url, bounds, options = {} }) => {
  const [tile, setTile] = useState(null);
  const map = useMap();

  useEffect(() => {
    if (map === undefined) {
      return;
    }
    const loadLayer = async (): Promise<void> => {
      let nextTile;
      if (bounds === undefined) {
        nextTile = new L.TileLayer(url, options);
      } else {
        const boundary = await getBoundary(bounds);
        // @ts-ignore no type available in this plugin
        nextTile = L.TileLayer.boundaryCanvas(url, {
          boundary,
          ...options,
        });
      }
      setTile(nextTile);
      map.addLayer(nextTile);
      map.attributionControl?.setPrefix('');
    };
    void loadLayer();
    return () => {
      if (options?.attribution !== undefined) {
        map.attributionControl?.removeAttribution(options?.attribution);
      }
    };
  }, [bounds, options, map, url]);

  useEffect(() => {
    return () => {
      if (map !== undefined && tile !== null) {
        map.removeLayer(tile);
      }
    };
  }, [map, tile]);

  return null;
};
export default TileLayerExtended;
