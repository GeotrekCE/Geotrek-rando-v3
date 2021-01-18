import '@testing-library/jest-dom';

jest.mock('./src/services/envLoader.ts', () => ({
  getApiUrl: () => 'https://geotrekdemo.ecrins-parcnational.fr/api/v2',
}));
