import { useRouter } from 'next/router';
import { FlatPageUI } from 'components/pages/flatPage';

const TouristicContent = () => {
  const router = useRouter();
  const { flatPage } = router.query;
  return <FlatPageUI flatPageUrl={flatPage} />;
};

export default TouristicContent;
