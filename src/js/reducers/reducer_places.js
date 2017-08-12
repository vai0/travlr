import { PLACES_FETCH_DATA_SUCCESS, PLACES_HAS_ERRORED, PLACES_IS_LOADING, PLACES_HIGHLIGHTED } from '../actions/index';

export default function(state = { places: null, isLoading: false, hasErrored: false }, action) {
  switch(action.type) {
    case PLACES_FETCH_DATA_SUCCESS: {
      const newPlaces = {};
      action.places.forEach(({ geometry, name, place_id, vicinity, opening_hours, rating }) => {
        newPlaces[place_id] = {
          geometry,
          name,
          place_id,
          vicinity,
          opening_hours,
          rating,
          isHighlighted: false
        };
      });
      return {
        ...state,
        places: newPlaces
      };
    }
    case PLACES_IS_LOADING: {
       return {
         ...state,
         isLoading: action.isLoading
       };
     }
    case PLACES_HAS_ERRORED: {
      return {
        ...state,
        hasErrored: action.hasErrored
      };
    }
    case PLACES_HIGHLIGHTED: {
      const place = state.places[action.place_id];
      place.isHighlighted = action.isHighlighted;
      const newPlaces = { ...state.places, [action.place_id] : place }
      return {
        ...state,
        places: newPlaces
      }
    }
    default:
      return state;
  }
}
