import { isUpperOrEqualCurrentAPIVersion } from '../utils';

describe('compare the API version', () => {
  it('should be equal to the current API version', () => {
    expect(isUpperOrEqualCurrentAPIVersion('2.104.0', { version: '2.104.0' })).toBe(true);
    expect(isUpperOrEqualCurrentAPIVersion('2.104.0', { version: '2.104.0+dev' })).toBe(true);
  });
  it('should be upper to the current API version', () => {
    expect(isUpperOrEqualCurrentAPIVersion('2.104.0', { version: '2.103.5' })).toBe(true);
    expect(isUpperOrEqualCurrentAPIVersion('2.104.0', { version: '2.4.590' })).toBe(true);
    expect(isUpperOrEqualCurrentAPIVersion('2.104.1', { version: '2.104.0+dev' })).toBe(true);
  });

  it('should be lower to the current API version', () => {
    expect(isUpperOrEqualCurrentAPIVersion('2.104.0', { version: '2.400.1' })).toBe(false);
  });
});
