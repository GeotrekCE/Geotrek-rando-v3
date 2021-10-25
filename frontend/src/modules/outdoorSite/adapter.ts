import { getAttachments, getThumbnails } from 'modules/utils/adapter';
import { adaptGeometry } from 'modules/utils/geometry';
import {
  OutdoorSite,
  OutdoorSiteDetails,
  RawOutdoorSite,
  RawOutdoorSiteDetails,
} from './interface';

export const adaptOutdoorSites = ({
  rawOutdoorSites,
}: {
  rawOutdoorSites: RawOutdoorSite[];
}): OutdoorSite[] =>
  rawOutdoorSites.map(rawOutdoorSite => ({
    id: rawOutdoorSite.id,
    type: 'OUTDOOR_SITE',
    name: rawOutdoorSite.name,
    thumbnailUris: getThumbnails(rawOutdoorSite.attachments),
    attachments: getAttachments(rawOutdoorSite.attachments),
    geometry: rawOutdoorSite.geometry ? adaptGeometry(rawOutdoorSite.geometry) : null,
  }));

export const adaptOutdoorSiteDetails = ({
  rawOutdoorSiteDetails,
}: {
  rawOutdoorSiteDetails: RawOutdoorSiteDetails;
}): OutdoorSiteDetails => ({
  id: rawOutdoorSiteDetails.id,
  type: 'OUTDOOR_SITE',
  name: rawOutdoorSiteDetails.properties.name,
  geometry: rawOutdoorSiteDetails.geometry ? adaptGeometry(rawOutdoorSiteDetails.geometry) : null,
  attachments: getAttachments(rawOutdoorSiteDetails.properties.attachments),
  description: rawOutdoorSiteDetails.properties.description,
  bbox: {
    corner1: { x: rawOutdoorSiteDetails.bbox[0], y: rawOutdoorSiteDetails.bbox[1] },
    corner2: { x: rawOutdoorSiteDetails.bbox[2], y: rawOutdoorSiteDetails.bbox[3] },
  },
});
