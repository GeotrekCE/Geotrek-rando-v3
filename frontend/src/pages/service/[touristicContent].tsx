import { useRouter } from 'next/router';
import { TouristicContentUI } from 'components/pages/touristicContent';
import { getDefaultLanguage } from 'modules/header/utills';

const TouristicContent = () => {
  const router = useRouter();
  const { touristicContent } = router.query;
  const language = router.locale ?? getDefaultLanguage();
  return <TouristicContentUI touristicContentUrl={touristicContent} language={language} />;
};

export default TouristicContent;
