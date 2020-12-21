import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import { selectPOIList } from 'redux/POI';
import { getPOIList } from 'redux/POI/actions';
import { RootState } from 'redux/types';
import { Home } from './Home';

export type WrapperProps = {
  POIList: string[];
  getPOIList: () => void;
};

const mapStateToProps = (state: RootState) => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  POIList: selectPOIList(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getPOIList: () => dispatch(getPOIList.request({ language: 'fr', page: 1, page_size: 10 })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
