import { combineReducers } from 'redux';

import UserCoordsReducer from './reducer_user_coords';
import MapReducer from './reducer_map';
import PlacesReducer from './reducer_places';
import MarkersReducer from './reducer_markers';

const rootReducer = combineReducers({
  userCoords: UserCoordsReducer,
  map: MapReducer,
  places: PlacesReducer,
  markers: MarkersReducer
});

export default rootReducer;
