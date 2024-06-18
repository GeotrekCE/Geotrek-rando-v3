import L, { GeoJSON, GeoJSONOptions, LayerOptions, TileLayer } from 'leaflet';
import { GeoJsonObject } from 'geojson';
import { useCallback, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet-boundary-canvas';

interface TileLayerExtendedProps {
  url: string;
  bounds?: string;
  options?: LayerOptions;
  rangeZoom?: number[];
}

interface ExtendedProperties {
  description?: string;
  name?: string;
  photo_url?: string;
  website?: string;
}

const getGeoJSONFromUrl = (geoJSONUrl: string) => {
  try {
    return fetch(geoJSONUrl).then(response => response.json());
  } catch {
    return null;
  }
};

const getGeoJSONLayer = async (url: string, options: LayerOptions) => {
  try {
    const geoJSON = (await getGeoJSONFromUrl(url)) as GeoJsonObject;
    return L.geoJSON(
      geoJSON,
      Object.assign(
        {
          style: feature => {
            const styles = {} as { fillColor?: string; color?: string };
            if (feature?.properties?.fill !== undefined) {
              styles.fillColor = feature.properties.fill;
            }
            if (feature?.properties?.stroke !== undefined) {
              styles.color = feature.properties.stroke;
            }
            return styles;
          },
          onEachFeature: (feature, layer) => {
            const markup = [];
            const { description, name, photo_url, website }: ExtendedProperties =
              feature?.properties ?? {};

            if (name) {
              markup.push(`<div class="info-point-title font-bold my-2">${name}</div>`);
            }

            if (photo_url) {
              markup.push(
                `<div class="info-point-photo my-2"><img src="${photo_url}" alt="" /></div>`,
              );
            }

            if (description) {
              markup.push(`<div class="info-point-description my-2">${description}</div>`);
            }

            if (website) {
              markup.push(
                `<div class="info-point-link my-2"><a target="_blank" rel="noopener noreferrer" href="${website}">${website}</a></div>`,
              );
            }

            if (markup.length > 0) {
              layer.bindPopup(markup.join('\n'));
            }

            if (layer instanceof L.Marker) {
              layer.setZIndexOffset(-5000);
            }
          },
        } as GeoJSONOptions,
        options,
      ),
    );
  } catch (e) {
    return null;
  }
};

const TileLayerExtended: React.FC<TileLayerExtendedProps> = ({
  url,
  bounds,
  options = {},
  rangeZoom = [0, 20],
}) => {
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  const [tile, setTile] = useState<null | TileLayer | GeoJSON>(null);
  const map = useMap();

  const loadLayer = useCallback(async (): Promise<void> => {
    let nextTile = null;
    if (bounds === undefined) {
      if (url.endsWith('.geojson') ?? url.endsWith('.json')) {
        const geoJSON = await getGeoJSONLayer(url, options);
        nextTile = geoJSON;
      } else {
        nextTile = new L.TileLayer(url, options);
      }
    } else {
      const boundary = await getGeoJSONFromUrl(bounds);
      // @ts-expect-error no type available in this plugin
      nextTile = TileLayer.boundaryCanvas(url, {
        boundary,
        ...options,
      }) as TileLayer;
    }
    if (nextTile !== null) {
      setTile(nextTile);
      map.addLayer(nextTile);
    }
    map.attributionControl?.setPrefix('');
  }, [url, bounds, options, map]);

  useEffect(() => {
    if (map === undefined) {
      return;
    }
    map.setMinZoom(rangeZoom[0]);
    map.setMaxZoom(rangeZoom[1]);
    void loadLayer();
  }, [map]);

  useEffect(() => {
    return () => {
      if (map !== undefined && tile !== null) {
        map.removeLayer(tile);
        if (options?.attribution !== undefined) {
          map.attributionControl?.removeAttribution(options?.attribution);
        }
      }
    };
  }, [map, tile]);

  return null;
};
export default TileLayerExtended;
