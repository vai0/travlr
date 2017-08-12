import { SET_MAP_CENTER, SET_MAP_BOUNDS, FETCH_LOCATION } from '../actions/index';

export default function(state = {}, action) {
  switch(action.type) {
    case SET_MAP_BOUNDS:
      return {
        ...state,
        mapBounds: action.bounds
      };
    default:
      return state;
  }
}
