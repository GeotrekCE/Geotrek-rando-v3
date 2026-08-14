import { getPolygonCentroid } from '../geometry';
import { RawCoordinate2D } from 'modules/interface';

describe('geometry utils', () => {
  describe('getPolygonCentroid', () => {
    it('returns [0, 0] for empty positions', () => {
      expect(getPolygonCentroid([])).toEqual([0, 0]);
    });

    it('calculates the correct centroid of a square polygon', () => {
      const square: RawCoordinate2D[] = [
        [0, 0],
        [0, 10],
        [10, 10],
        [10, 0],
      ];
      expect(getPolygonCentroid(square)).toEqual([5, 5]);
    });

    it('calculates the correct centroid of a closed GeoJSON square polygon [A, B, C, D, A]', () => {
      const closedSquare: RawCoordinate2D[] = [
        [0, 0],
        [0, 10],
        [10, 10],
        [10, 0],
        [0, 0],
      ];
      expect(getPolygonCentroid(closedSquare)).toEqual([5, 5]);
    });

    it('calculates the centroid of a triangle polygon', () => {
      const triangle: RawCoordinate2D[] = [
        [0, 0],
        [6, 0],
        [3, 6],
        [0, 0],
      ];
      expect(getPolygonCentroid(triangle)).toEqual([3, 2]);
    });
  });
});
