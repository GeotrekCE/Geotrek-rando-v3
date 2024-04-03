import { isLowerOrEqualCurrentAPIVersion } from '../utils';

describe('compare the expected version to the current API version', () => {
  it('should be equal to the current API version', () => {
    expect(isLowerOrEqualCurrentAPIVersion('2.104.0', { version: '2.104.0' })).toBe(true);
    expect(isLowerOrEqualCurrentAPIVersion('2.104.0', { version: '2.104.0+dev' })).toBe(true);
  });
  it('should be upper to the current API version', () => {
    expect(isLowerOrEqualCurrentAPIVersion('2.104.0', { version: '2.103.5' })).toBe(false);
    expect(isLowerOrEqualCurrentAPIVersion('2.104.0', { version: '2.4.590' })).toBe(false);
    expect(isLowerOrEqualCurrentAPIVersion('2.104.1', { version: '2.104.0+dev' })).toBe(false);
  });

  it('should be lower to the current API version', () => {
    expect(isLowerOrEqualCurrentAPIVersion('2.104.0', { version: '2.400.1' })).toBe(true);
  });
});
