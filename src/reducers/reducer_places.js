import { PLACES_FETCH_DATA_SUCCESS, PLACES_HAS_ERRORED, PLACES_IS_LOADING } from '../actions/index';

export default function(state = [], action) {
  switch(action.type) {
    case PLACES_FETCH_DATA_SUCCESS:
      return action.places;
    case PLACES_IS_LOADING:
      return action.isLoading;
    case PLACES_HAS_ERRORED:
      return action.hasErrored;
    default:
      return state;
  }
}
