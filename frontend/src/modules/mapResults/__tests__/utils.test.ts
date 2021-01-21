import { computePageCount, formatLocation } from '../utils';

describe('computeNumberOfPages', () => {
  it('should correctly compute number of pages for an exact division', () => {
    const pageSize = 5;
    const resultsCount = 15;
    const output = computePageCount(pageSize, resultsCount);
    const expected = 3;

    expect(output).toBe(expected);
  });

  it('should correctly compute number of pages for a partial division', () => {
    const pageSize = 5;
    const resultsCount = 12;
    const output = computePageCount(pageSize, resultsCount);
    const expected = 3;

    expect(output).toBe(expected);
  });
});

describe('formatLocation', () => {
  it('should transform array of coordinates into an object with explicit properties', () => {
    const input = [34, 12345];
    const output = formatLocation(input);
    const expected = { x: 34, y: 12345 };

    expect(output).toStrictEqual(expected);
  });
  it('should return null if input is null', () => {
    const input = null;
    const output = formatLocation(input);
    const expected = null;

    expect(output).toBe(expected);
  });
});
