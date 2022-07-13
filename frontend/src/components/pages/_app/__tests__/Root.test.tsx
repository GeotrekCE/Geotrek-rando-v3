import { render } from 'services/testing/reactTestingLibraryWrapper';
import { Root } from '../Root';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    locales: {
      en: { title: 'Title' },
      fr: { title: 'Titre' },
    },
  },
}));

test('AAU, I can see a Root', () => {
  render(<Root hasError={false} />);
});
