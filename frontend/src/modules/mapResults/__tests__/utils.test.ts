import { computePageCount, formatLocation, generateNextUrl, generatePagesUrls } from '../utils';

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
describe('generateAllPagesUrls', () => {
  it('should generate a list of results pages', () => {
    const input =
      'https://geotrekdemo.ecrins-parcnational.fr/api/v2/trek/?fields=id%2Cparking_location&language=fr&page=2&page_size=5';
    const output = generatePagesUrls(input, 4);
    const expected = [
      'https://geotrekdemo.ecrins-parcnational.fr/api/v2/trek/?fields=id%2Cparking_location&language=fr&page=1&page_size=5',
      'https://geotrekdemo.ecrins-parcnational.fr/api/v2/trek/?fields=id%2Cparking_location&language=fr&page=2&page_size=5',
      'https://geotrekdemo.ecrins-parcnational.fr/api/v2/trek/?fields=id%2Cparking_location&language=fr&page=3&page_size=5',
      'https://geotrekdemo.ecrins-parcnational.fr/api/v2/trek/?fields=id%2Cparking_location&language=fr&page=4&page_size=5',
    ];

    expect(output).toStrictEqual(expected);
  });
});

describe('generateNextUrl', () => {
  it('should replace the input url page with the given page parameter', () => {
    const input =
      'https://geotrekdemo.ecrins-parcnational.fr/api/v2/trek/?fields=id%2Cparking_location&language=fr&page=2&page_size=5';
    const output = generateNextUrl(input, 3);
    const expected =
      'https://geotrekdemo.ecrins-parcnational.fr/api/v2/trek/?fields=id%2Cparking_location&language=fr&page=3&page_size=5';

    expect(output).toBe(expected);
  });

  it('should replace the input url page with the given page parameter with multiple numbers', () => {
    const input =
      'https://geotrekdemo.ecrins-parcnational.fr/api/v2/trek/?fields=id%2Cparking_location&language=fr&page=9481&page_size=5';
    const output = generateNextUrl(input, 124);
    const expected =
      'https://geotrekdemo.ecrins-parcnational.fr/api/v2/trek/?fields=id%2Cparking_location&language=fr&page=124&page_size=5';

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
