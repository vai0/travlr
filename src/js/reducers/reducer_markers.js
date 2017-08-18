import { SET_MARKERS, SET_MARKER_HIGHLIGHT, REMOVE_MARKERS } from '../actions/index';

export default function(state = {}, action) {
  switch(action.type) {
    case SET_MARKERS:
      return action.markers;
    case SET_MARKER_HIGHLIGHT:
      return {
        ...state,
        [action.place_id] : {
          ...state[action.place_id],
          isHighlighted: action.bool
        }
      };
    case REMOVE_MARKERS:
      return {};
    default:
      return state;
  }
}
