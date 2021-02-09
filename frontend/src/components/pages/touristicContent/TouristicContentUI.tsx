import { Layout } from 'components/Layout/Layout';

interface TouristicContentUIProps {
  toursiticContentUrl: string | string[] | undefined;
}

export const TouristicContentUI: React.FC<TouristicContentUIProps> = ({ toursiticContentUrl }) => {
  return (
    <Layout>
      <div>{toursiticContentUrl}</div>
    </Layout>
  );
};
