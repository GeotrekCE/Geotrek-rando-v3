import { Button } from 'components/Button';
import { Layout } from 'components/Layout/Layout';
import { Link } from 'components/Link';
import { NextPage } from 'next';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;

  h1 {
    font-weight: bold;
    margin: 32px;
    font-size: 200%;
    padding-right: 32px;
    border-right: 1px solid #000;
  }
`;

const Spacer = styled.div`
  height: 64px;
`;

const Custom404: NextPage = () => {
  return (
    <Layout>
      <Spacer />

      <Container>
        <h1>404</h1>
        <div>
          <FormattedMessage id={'page.not-found'} />
        </div>
      </Container>

      <Spacer />

      <Container>
        <Link href={'/'}>
          <Button>
            <FormattedMessage id={'page.back'} />
          </Button>
        </Link>
      </Container>
    </Layout>
  );
};

export default Custom404;
