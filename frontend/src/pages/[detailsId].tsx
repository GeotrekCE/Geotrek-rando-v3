import { useRouter } from 'next/router';
import { DetailsUI } from 'components/pages/details';

const Details = () => {
  const router = useRouter();
  const { detailsId } = router.query;

  return <DetailsUI detailsId={detailsId} />;
};

export default Details;
