import { formatLocation } from '../utils';

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
