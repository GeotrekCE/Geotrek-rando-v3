import { computePageCount, generatePageNumbersArray } from 'modules/utils/connector';
import { concatMapResults, formatLocation } from '../utils';

const MockRawMapResults = [
  {
    id: 2,
    parking_location: [6.1231119, 44.7475257],
    practice: 1,
  },
  {
    id: 501,
    parking_location: [6.116054, 44.7465199],
    practice: 1,
  },
  {
    id: 582,
    parking_location: [6.0860825, 44.7155137],
    practice: 1,
  },
  {
    id: 586,
    parking_location: [6.1234998, 44.7481277],
    practice: 1,
  },
  {
    id: 592,
    parking_location: [6.0668896, 44.7318421],
    practice: 1,
  },
];

const MockRawMapResultsResponse = {
  count: 9,
  next:
    'https://geotrekdemo.ecrins-parcnational.fr/api/v2/trek/?fields=id%2Cparking_location&language=fr&page=2&page_size=5',
  results: MockRawMapResults,
};

describe('concatMapResults', () => {
  it('should concatenate all raw api results into one array of results', () => {
    const input = [MockRawMapResultsResponse, MockRawMapResultsResponse];
    const output = concatMapResults(input);
    const expected = [...MockRawMapResults, ...MockRawMapResults];

    expect(output).toStrictEqual(expected);
  });
});

describe('generatePageNumbersArray', () => {
  it('should generate an array with the right pages numbers', () => {
    const pageSize = 5;
    const resultsCount = 15;
    const output = generatePageNumbersArray(pageSize, resultsCount);
    const expected = [1, 2, 3];

    expect(output).toStrictEqual(expected);
  });
});

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
