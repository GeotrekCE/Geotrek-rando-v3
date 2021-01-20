import type { Config } from '@jest/types';

const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$';

const config: Config.InitialOptions = {
  setupFilesAfterEnv: ['<rootDir>/jestAfterEnv.setup.tsx'],
  testRegex: TEST_REGEX,
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^__fixtures__/(.*)$': '<rootDir>/src/__fixtures__/$1',
    '^__mocks__/(.*)$': '<rootDir>/src/__mocks__/$1',
    '^services/(.*)$': '<rootDir>/src/services/$1',
    '^translations/(.*)$': '<rootDir>/src/translations/$1',
    '^stylesheet$': '<rootDir>/src/stylesheet.ts',
  },
  testPathIgnorePatterns: ['<rootDir>/src/.next/', '<rootDir>/node_modules/', '<rootDir>/cypress/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/.next/',
    '<rootDir>/src/pages/_app.tsx',
    '<rootDir>/src/pages/_document.tsx',
    '<rootDir>/src/server.js',
    '<rootDir>/src/services/api/client.ts',
    '<rootDir>/src/services/sentry.js',
  ],
  moduleDirectories: ['node_modules', 'src'],
};

export default config;
