import { Dot, LoaderContainer, LoaderWrapper } from './Loader.style';

// Loader from https://loading.io/css/
const Loader: React.FC = () => (
  <LoaderWrapper>
    <LoaderContainer>
      <Dot />
      <Dot />
      <Dot />
      <Dot />
      <Dot />
      <Dot />
      <Dot />
      <Dot />
      <Dot />
      <Dot />
      <Dot />
      <Dot />
    </LoaderContainer>
  </LoaderWrapper>
);

export default Loader;
