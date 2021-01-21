import '@testing-library/jest-dom';
import nock from 'nock';

jest.mock('./src/services/envLoader.ts', () => ({
  getApiUrl: () => 'https://geotrekdemo.ecrins-parcnational.fr/api/v2',
}));

jest.mock('./src/components/Map', () => ({
  MapDynamicComponent: () => null,
}));

// API calls should always be mocked else we might have inconsistencies
// depending on our testing environment
nock.disableNetConnect();
