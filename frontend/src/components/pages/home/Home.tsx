import { FunctionComponent } from 'react';

import { Layout } from 'components/Layout/Layout';
import Button from 'components/Button';
import Map from 'components/Map';
import { WrapperProps } from './Home.wrap';
import {
  Code,
  DescriptionLine,
  DescriptionList,
  HomeContainer,
  HowTo,
  Logo,
  Title,
} from './Home.style';

const HomeUI: FunctionComponent<WrapperProps> = ({
  getPOIList,
  POIList,
  getTreksList,
  TreksList,
}) => (
  <Layout>
    <Map points={POIList} segments={TreksList} />
    <HomeContainer>
      <Logo alt="logo" src="/logo.png" />
      <Title>Welcome to Geotrek</Title>
      <HowTo>
        <DescriptionList>
          <DescriptionLine>
            To create a page or a component, run <Code>yarn generate</Code>.
          </DescriptionLine>
          <DescriptionLine>
            The style is centralized in the <Code>src/stylesheet.ts</Code>. From there, you can
            manage colors, font properties, spacing unit...
          </DescriptionLine>
          <DescriptionLine>
            The <Code>src/components/AppCrashFallback</Code> that will display when there is a
            javascript error.
          </DescriptionLine>
          <DescriptionLine>
            Read more about the tools and built-in features in the <Code>README.md</Code>.
          </DescriptionLine>
          <Button onClick={() => Promise.all([getTreksList(), getPOIList()])}>Click me !</Button>
        </DescriptionList>
      </HowTo>
    </HomeContainer>
  </Layout>
);

export const Home = HomeUI;
