import { BOOKMARKS_ADD_PLACE, BOOKMARKS_REMOVE_PLACE, BOOKMARKS_REFRESH } from '../actions/index';
import { flattenBookmarks } from '../helpers';

export default function(state = {}, action) {
  switch(action.type) {
    case BOOKMARKS_ADD_PLACE: {
      const newState = { ...state };
      action.label in newState ?
        newState[action.label][action.place.place_id] = action.place :
        newState[action.label] = {
          [action.place.place_id]: action.place
        };
      return newState;
    }
    case BOOKMARKS_REMOVE_PLACE: {
      const newState = { ...state };
      const label = action.label;
      const place_id = action.place_id;
      const placesCountInLabel = Object.keys(newState[label]).length === 1;
      newState[label][place_id] && placesCountInLabel ?
        delete newState[label] :
        delete newState[label][place_id];
      return newState;
    }
    case BOOKMARKS_REFRESH: {
      const newBookmarks = {};
      action.bookmarks.forEach(bookmark => {
        const { label, place_id } = bookmark;
        if (newBookmarks[label]) {
          newBookmarks[label][place_id] = bookmark;
        } else {
          newBookmarks[label] = {};
          newBookmarks[label][place_id] = bookmark;
        }
      });
      return newBookmarks;
    }
    default:
      return state;
  }
}
