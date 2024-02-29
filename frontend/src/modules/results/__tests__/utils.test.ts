import {
  extractNextPageId,
  formatDistance,
  formatSelectedFilter,
  formatTextFilter,
  formatTrekFiltersToUrlParams,
} from '../utils';

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

describe('formatSelectedFilter', () => {
  it('should concat the array values in a string separated by commas', () => {
    const input = ['2', '3', '5', '10'];
    const output = formatSelectedFilter(input);
    const expected = '2,3,5,10';
    expect(output).toBe(expected);
  });
});

describe('formFiltersToUrlParams', () => {
  it('transform the array into an objet with the right properties', () => {
    const input = [
      {
        id: 'difficulty',
        selectedOptions: ['3', '4'],
      },
    ];
    const output = formatTrekFiltersToUrlParams(input);
    const expected = { difficulty_min: '3', difficulty_max: '4' };
    expect(output).toStrictEqual(expected);
  });

  it('should ignore properties with no selected options', () => {
    const input = [
      {
        id: 'difficulty',
        selectedOptions: [],
      },
      {
        id: 'difficulty2',
        selectedOptions: ['1', '3', '4'],
      },
      {
        id: 'difficulty3',
        selectedOptions: ['2', '4'],
      },
    ];
    const output = formatTrekFiltersToUrlParams(input);
    const expected = { difficulty2: '1,3,4', difficulty3: '2,4' };
    expect(output).toStrictEqual(expected);
  });
});

describe('extractNextPageId', () => {
  it('should correctly parse next Page urls when page params is surrounded by other params', () => {
    const input =
      'https://geotrekdemo.ecrins-parcnational.fr/api/v2/trek/?fields=id%2Cdeparture%2Cname%2Cthemes%2Cduration%2Clength_2d%2Cascent%2Cdifficulty%2Creservation_system%2Cthumbnail%2Cpractice&language=fr&page=2&page_size=5';
    const output = extractNextPageId(input);
    const expected = 2;
    expect(output).toBe(expected);
  });

  it('should correctly parse next Page urls when page is the last param', () => {
    const input =
      'https://geotrekdemo.ecrins-parcnational.fr/api/v2/trek/?fields=id%2Cdeparture%2Cname%2Cthemes%2Cduration%2Clength_2d%2Cascent%2Cdifficulty%2Creservation_system%2Cthumbnail%2Cpractice&language=fr&page=5';
    const output = extractNextPageId(input);
    const expected = 5;
    expect(output).toBe(expected);
  });

  it('should correctly parse next Page urls when page param value has multiple digits', () => {
    const input =
      'https://geotrekdemo.ecrins-parcnational.fr/api/v2/trek/?fields=id%2Cdeparture%2Cname%2Cthemes%2Cduration%2Clength_2d%2Cascent%2Cdifficulty%2Creservation_system%2Cthumbnail%2Cpractice&language=fr&page=910&page_size=5';
    const output = extractNextPageId(input);
    const expected = 910;
    expect(output).toBe(expected);
  });

  it('should return null if nextPageUrl is null', () => {
    const input = null;
    const output = extractNextPageId(input);
    const expected = null;
    expect(output).toBe(expected);
  });

  it('should throw an error if it cant find the next page id', () => {
    expect(() => extractNextPageId('')).toThrow();
  });

  describe('formatTextFilter', () => {
    test.each`
      textfilter              | expectedFormattedTextFilter
      ${'col de font froide'} | ${{ q: 'col de font froide' }}
      ${null}                 | ${undefined}
    `(
      'formats the textfilter properly with $textfilter',
      ({ textfilter, expectedFormattedTextFilter }) => {
        const formattedText = formatTextFilter(textfilter as string | null);

        expect(formattedText).toEqual(expectedFormattedTextFilter);
      },
    );
  });
});
