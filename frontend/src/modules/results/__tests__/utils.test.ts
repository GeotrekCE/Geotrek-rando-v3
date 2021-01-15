import { formatDistance } from '../utils';

describe('formatDistance', () => {
  it('should add m after distances', () => {
    expect(formatDistance(5)).toBe('5m');
  });

  it('should round distances', () => {
    expect(formatDistance(125.124)).toBe('125m');
    expect(formatDistance(634.9)).toBe('635m');
  });

  it('should add km after distances above 1000 and divide by 1000', () => {
    expect(formatDistance(2000)).toBe('2km');
    expect(formatDistance(1000)).toBe('1km');
  });

  it('should round the distances in km with one decimal', () => {
    expect(formatDistance(1534)).toBe('1,5km');
    expect(formatDistance(1699)).toBe('1,7km');
  });
});
