import React from 'react';

import { Layout } from 'components/Layout/Layout';
import { FilterBar } from './components/FilterBar';
import { ResultCard } from './components/ResultCard';

export const ResultsUI: React.FC = () => {
  return (
    <Layout>
      <FilterBar />
      <ResultCard />
      <ResultCard />
      <ResultCard />
    </Layout>
  );
};
