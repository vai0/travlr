import { CURRENT_MAP_BOUNDS } from '../actions/index';

export default function(state = {}, action) {
  switch(action.type) {
    case CURRENT_MAP_BOUNDS:
      return {
        ...state,
        mapBounds: action.bounds
      };
    default:
      return state;
  }
}
