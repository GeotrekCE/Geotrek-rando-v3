import React from 'react';

import { Layout } from 'components/Layout/Layout';
import { FilterBar } from './components/FilterBar';

export const ResultsUI: React.FC = () => {
  return (
    <Layout>
      <FilterBar />
    </Layout>
  );
};
