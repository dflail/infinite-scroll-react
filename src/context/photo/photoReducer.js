import types from './photoTypes';
import constants from '../../utils/constants';

export default (state, action) => {
  switch (action.type) {
    case types.GET_PHOTOS:
      return {
        ...state,
        loading: true
      };
    case types.PHOTOS_LOADED:
      return {
        ...state,
        loading: false,
        data: state.data.concat(...action.payload),
        hasMore: action.payload.length === constants.LIMIT,
        page: state.page + 1
      };
    default:
      return {
        state
      };
  }
};
