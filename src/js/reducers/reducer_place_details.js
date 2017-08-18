import { PLACE_DETAILS_FETCH_DATA_SUCCESS, PLACE_DETAILS_HAS_ERRORED, PLACE_DETAILS_IS_LOADING, PLACE_DETAILS_CLOSE, RESET_PLACES_AND_PLACE_DETAILS } from '../actions/index';

export default function(state = { place: null, isLoading: false, hasErrored: false }, action) {
  switch(action.type) {
    case PLACE_DETAILS_FETCH_DATA_SUCCESS:
      return {
        isLoading: false,
        hasErrored: false,
        place: action.place
      };
    case PLACE_DETAILS_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case PLACE_DETAILS_HAS_ERRORED:
      return {
        ...state,
        hasErrored: action.hasErrored
      };
    case PLACE_DETAILS_CLOSE:
      return {
        ...state,
        place: null
      };
    case RESET_PLACES_AND_PLACE_DETAILS:
      return {
        place: null,
        isLoading: false,
        hasErrored: false
      };
    default:
      return state;
  }
}
