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
            Read more about the tools and built-in features in the <Code>README.md</Code>.
          </DescriptionLine>
          <Button onClick={() => Promise.all([getTreksList(), getPOIList()])}>
            Click here to load POIs and Treks from the front and display them on the map
          </Button>
        </DescriptionList>
      </HowTo>
    </HomeContainer>
    <Map points={POIList} segments={TreksList} />
  </Layout>
);

export const Home = HomeUI;
