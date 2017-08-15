import { combineReducers } from 'redux';

import UserCoordsReducer from './reducer_user_coords';
import MapReducer from './reducer_map';
import PlacesReducer from './reducer_places';
import PlaceDetailsReducer from './reducer_place_details';
import MarkersReducer from './reducer_markers';
import BookmarksReducer from './reducer_bookmarks';

const rootReducer = combineReducers({
  userCoords: UserCoordsReducer,
  map: MapReducer,
  places: PlacesReducer,
  placeDetails: PlaceDetailsReducer,
  markers: MarkersReducer,
  bookmarks: BookmarksReducer
});

export default rootReducer;
