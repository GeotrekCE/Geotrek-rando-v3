import { render } from 'services/testing/reactTestingLibraryWrapper';

import { QueryClient, QueryClientProvider } from 'react-query';

import { Home } from '../';

test('AAU, I can see the home page', () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>,
  );
});
