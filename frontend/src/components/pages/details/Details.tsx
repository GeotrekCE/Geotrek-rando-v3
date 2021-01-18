import { Layout } from 'components/Layout/Layout';

interface Props {
  detailsId: any;
}
export const DetailsUI: React.FC<Props> = ({ detailsId }) => {
  return (
    <Layout>
      <div>Test page détail</div>
      <div>{detailsId}</div>
    </Layout>
  );
};
