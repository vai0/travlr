import { FETCH_LOCATION } from '../actions/index';

export default function(
  state = {
    location: null,
    userCoordsReceived: false
  }, action) {

  switch(action.type) {
    case FETCH_LOCATION:
      return {
        userCoordsReceived: true,
        location: action.location
      };
    default:
      return state;
  }
}
