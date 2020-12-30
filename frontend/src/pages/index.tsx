import { appWrapper, ReduxSagaStore } from 'redux/store';
import { END } from 'redux-saga';
import { getPOIList } from 'redux/POI/actions';
import { getTreksList } from 'redux/Trek/actions';
import { RootState } from 'redux/types';
import { connect } from 'react-redux';

import { Home } from 'components/pages/home';

export const getServerSideProps = appWrapper.getServerSideProps(async ({ store }) => {
  store.dispatch(getTreksList.server.request({ language: 'fr', page: 1, page_size: 10 }));
  store.dispatch(getPOIList.server.request({ language: 'fr', page: 1, page_size: 10 }));
  store.dispatch(END);
  await (store as ReduxSagaStore<typeof store>).sagaTask.toPromise();
  return { props: { POIList: store.getState().POI.server.POIList } };
});

export default connect((state: RootState) => state)(Home);
