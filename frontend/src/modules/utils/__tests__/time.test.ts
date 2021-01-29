import { formatHours } from '../time';

describe('formatHours', () => {
  describe('should append h behind hours below 24', () => {
    it('14h', () => {
      const input = 14;
      const output = formatHours(input);
      const expected = '14h';

      expect(output).toBe(expected);
    });
    it('23h', () => {
      const input = 23;
      const output = formatHours(input);
      const expected = '23h';

      expect(output).toBe(expected);
    });
    it('0h', () => {
      const input = 0;
      const output = formatHours(input);
      const expected = '0h';

      expect(output).toBe(expected);
    });
  });

  describe('should convert 24 multiples into equivalent days', () => {
    it('1j', () => {
      const input = 24;
      const output = formatHours(input);
      const expected = '1j';

      expect(output).toBe(expected);
    });
    it('3j', () => {
      const input = 72;
      const output = formatHours(input);
      const expected = '3j';

      expect(output).toBe(expected);
    });
  });

  describe('should round to day above non 24 multiples higher than 24', () => {
    it('26h', () => {
      const input = 26;
      const output = formatHours(input);
      const expected = '2j';

      expect(output).toBe(expected);
    });
  });

  describe('should format hours decimals into minutes', () => {
    it('1h30', () => {
      const input = 1.5;
      const output = formatHours(input);
      const expected = '1h30';

      expect(output).toBe(expected);
    });
    it('5.8', () => {
      const input = 5.8;
      const output = formatHours(input);
      const expected = '5h48';

      expect(output).toBe(expected);
    });
  });
});
