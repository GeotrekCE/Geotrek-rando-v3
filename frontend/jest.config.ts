import type { Config } from '@jest/types';

const nextJest = require('next/jest');

const createJestConfig = nextJest();

const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$';

const config: Config.InitialOptions = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jestAfterEnv.setup.tsx'],
  testRegex: TEST_REGEX,
  moduleNameMapper: {
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^__fixtures__/(.*)$': '<rootDir>/src/__fixtures__/$1',
    '^__mocks__/(.*)$': '<rootDir>/src/__mocks__/$1',
    '^services/(.*)$': '<rootDir>/src/services/$1',
    '^translations/(.*)$': '<rootDir>/src/translations/$1',
    '^stylesheet$': '<rootDir>/src/stylesheet.ts',
    '^customization(.*)$': '<rootDir>/customization/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,ts,tsx}'],
  moduleDirectories: ['node_modules', 'src'],
};

module.exports = createJestConfig(config);
