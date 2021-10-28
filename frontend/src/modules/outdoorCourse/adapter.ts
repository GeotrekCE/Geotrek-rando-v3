import { getAttachments, getThumbnails } from 'modules/utils/adapter';
import { adaptGeometry } from 'modules/utils/geometry';
import { dataUnits } from '../results/adapter';
import { formatHours } from '../utils/time';
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
  rawOutdoorCourses.map(rawOutdoorCourse => {
    return {
      id: rawOutdoorCourse.id,
      name: rawOutdoorCourse.name,
      attachments: getAttachments(rawOutdoorCourse.attachments),
      geometry: rawOutdoorCourse.geometry ? adaptGeometry(rawOutdoorCourse.geometry) : null,
      thumbnailUris: getThumbnails(rawOutdoorCourse.attachments),
      duration: rawOutdoorCourse.duration ? formatHours(rawOutdoorCourse.duration) : null,
      maxElevation: rawOutdoorCourse.max_elevation
        ? `+${rawOutdoorCourse.max_elevation}${dataUnits.distance}`
        : null,
      length: rawOutdoorCourse.length
        ? `${Math.round(rawOutdoorCourse.length)}${dataUnits.distance}`
        : null,
      height: rawOutdoorCourse.height ? `${rawOutdoorCourse.height}${dataUnits.distance}` : null,
    };
  });

export const adaptOutdoorCourseDetails = ({
  rawOutdoorCourseDetails,
}: {
  rawOutdoorCourseDetails: RawOutdoorCourseDetails;
}): OutdoorCourseDetails => ({
  // We use the original adapter
  ...adaptOutdoorCourses({
    rawOutdoorCourses: [rawOutdoorCourseDetails.properties as RawOutdoorCourse],
  })[0],
  // then we add missing fields
  description: rawOutdoorCourseDetails.properties.description,
  bbox: {
    corner1: { x: rawOutdoorCourseDetails.bbox[0], y: rawOutdoorCourseDetails.bbox[1] },
    corner2: { x: rawOutdoorCourseDetails.bbox[2], y: rawOutdoorCourseDetails.bbox[3] },
  },
});
