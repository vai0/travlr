import { SET_MARKERS } from '../actions/index';

export default function(state = {}, action) {
  switch(action.type) {
    case SET_MARKERS:
      return action.markers;
    default:
      return state;
  }
}
