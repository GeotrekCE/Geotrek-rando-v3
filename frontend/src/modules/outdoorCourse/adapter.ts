import { getAttachments } from 'modules/utils/adapter';
import { adaptGeometry } from 'modules/utils/geometry';
import {
  OutdoorCourse,
  OutdoorCourseDetails,
  RawOutdoorCourse,
  RawOutdoorCourseDetails,
} from './interface';

export const adaptOutdoorCourses = ({
  rawOutdoorCourses,
}: {
  rawOutdoorCourses: RawOutdoorCourse[];
}): OutdoorCourse[] =>
  rawOutdoorCourses.map(rawOutdoorCourse => ({
    id: rawOutdoorCourse.id,
    name: rawOutdoorCourse.name,
    attachments: getAttachments(rawOutdoorCourse.attachments),
    geometry: rawOutdoorCourse.geometry ? adaptGeometry(rawOutdoorCourse.geometry) : null,
  }));

export const adaptOutdoorCourseDetails = ({
  rawOutdoorCourseDetails,
}: {
  rawOutdoorCourseDetails: RawOutdoorCourseDetails;
}): OutdoorCourseDetails => ({
  id: rawOutdoorCourseDetails.id,
  name: rawOutdoorCourseDetails.properties.name,
  geometry: rawOutdoorCourseDetails.geometry
    ? adaptGeometry(rawOutdoorCourseDetails.geometry)
    : null,
  attachments: getAttachments(rawOutdoorCourseDetails.properties.attachments),
  description: rawOutdoorCourseDetails.properties.description,
  bbox: {
    corner1: { x: rawOutdoorCourseDetails.bbox[0], y: rawOutdoorCourseDetails.bbox[1] },
    corner2: { x: rawOutdoorCourseDetails.bbox[2], y: rawOutdoorCourseDetails.bbox[3] },
  },
});
