import { SET_MAP_CENTER, SET_MAP_BOUNDS, FETCH_LOCATION } from '../actions/index';

export default function(state = { mapCenter: { lat: 37.7749, lng: -122.419 }, mapBounds: {}}, action) {
  switch(action.type) {
    case SET_MAP_CENTER:
      return {
        ...state,
        mapCenter: action.payload
      };
    case SET_MAP_BOUNDS:
      return {
        ...state,
        mapBounds: action.payload
      }
    case FETCH_LOCATION:
      return {
        ...state,
        mapCenter: action.payload
      };
    default:
      return state;
  }
}
