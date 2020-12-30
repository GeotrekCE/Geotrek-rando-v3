import { POIList } from 'domain/POI/POI';
import { TreksList } from 'domain/Trek/Trek';
import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import { selectPOIList } from 'redux/POI';
import { getPOIList } from 'redux/POI/actions';
import { selectTreksList } from 'redux/Trek';
import { getTreksList } from 'redux/Trek/actions';
import { RootState } from 'redux/types';
import { Home } from './Home';

export type WrapperProps = {
  POIList: POIList | null;
  treksList: TreksList | null;
  getPOIList: () => void;
  getTreksList: () => void;
};

const mapStateToProps = (state: RootState) => ({
  POIList: selectPOIList(state),
  treksList: selectTreksList(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getPOIList: () => dispatch(getPOIList.client.request({ language: 'fr', page: 2, page_size: 10 })),
  getTreksList: () =>
    dispatch(getTreksList.client.request({ language: 'fr', page: 2, page_size: 10 })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
