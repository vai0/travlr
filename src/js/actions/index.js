export const FETCH_LOCATION = 'FETCH_LOCATION';
export const CURRENT_MAP_BOUNDS = 'CURRENT_MAP_BOUNDS';
export const PLACES_FETCH_DATA_SUCCESS = 'PLACES_FETCH_DATA_SUCCESS';
export const PLACES_HAS_ERRORED = 'PLACES_HAS_ERRORED';
export const PLACES_IS_LOADING = 'PLACES_IS_LOADING';
export const PLACES_GET_MAP_BOUNDS = 'PLACES_GET_MAP_BOUNDS';
export const SET_MARKERS = 'SET_MARKERS';
export const SET_MARKER_HIGHLIGHT = 'SET_MARKER_HIGHLIGHT';
export const REMOVE_MARKERS = 'REMOVE_MARKERS';
export const PLACES_HIGHLIGHTED = 'PLACES_HIGHLIGHTED';
export const PLACE_DETAILS_FETCH_DATA_SUCCESS = 'PLACE_DETAILS_FETCH_DATA_SUCCESS';
export const PLACE_DETAILS_HAS_ERRORED = 'PLACE_DETAILS_HAS_ERRORED';
export const PLACE_DETAILS_IS_LOADING = 'PLACE_DETAILS_IS_LOADING';
export const PLACE_DETAILS_CLOSE = 'PLACE_DETAILS_CLOSE';
export const BOOKMARKS_ADD_PLACE = 'BOOKMARKS_ADD_PLACE';
export const BOOKMARKS_REMOVE_PLACE = 'BOOKMARKS_REMOVE_PLACE';
export const RESET_PLACES_AND_PLACE_DETAILS = 'RESET_PLACES_AND_PLACE_DETAILS';
export const BOOKMARKS_REFRESH = 'BOOKMARKS_REFRESH';

export function resetPlacesAndPlaceDetails() {
  return {
    type: RESET_PLACES_AND_PLACE_DETAILS
  };
}

// BOOKMARKS

export function bookmarksAddPlace(placeDetails, label) {
  const cleanedLabel = label.trim().toLowerCase();
  return {
    type: BOOKMARKS_ADD_PLACE,
    label: cleanedLabel,
    place: {
      ...placeDetails,
      label: cleanedLabel
    }
  };
}

export function bookmarksRemovePlace(place_id, label) {
  return {
    type: BOOKMARKS_REMOVE_PLACE,
    place_id,
    label
  }
}

export function bookmarksRefresh(bookmarks) {
  return (dispatch) => {
    const promises = bookmarks.map(bookmark => {
      return new Promise((resolve, reject) => {
        const request = { placeId: bookmark.place_id };
        const service = new google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails(request, (place, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            place.label = bookmark.label;
            resolve(place);
          } else {
            reject();
          }
        });
      });
    });

    Promise.all(promises)
      .then(bookmarks => {
        dispatch({
          type: BOOKMARKS_REFRESH,
          bookmarks
        })})
      .catch(() => dispatch(placesHasErrored(true)));
  }
}

// MAP STUFF

export function fetchLocation() {
  return dispatch => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        dispatch({
          type: FETCH_LOCATION,
          location
        });
      });
    } else {
      console.log('fetchLocation error: ', error);
    }
  }
}

export function currentMapBounds(bounds) {
  return {
    type: CURRENT_MAP_BOUNDS,
    bounds
  }
}

export function setMarkers(places) {
  const markers = {};
  if (Array.isArray(places)) {
    places.forEach((place) => {
      markers[place.place_id] = {
        place_id: place.place_id,
        location: place.geometry.location,
        isHighlighted: false
      };
    });
  } else {
    markers[places.place_id] = {
      place_id: places.place_id,
      location: places.geometry.location,
      isHighlighted: false
    }
  }
  return {
    type: SET_MARKERS,
    markers
  };
}

export function setMarkerHighlight(place_id, bool) {
  return {
    type: SET_MARKER_HIGHLIGHT,
    place_id,
    bool
  };
}

export function removeMarkers() {
  return {
    type: REMOVE_MARKERS
  };
}

// PLACES RESULTS LIST

export function placesFetchData(request, bounds) {
  return (dispatch) => {
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    dispatch(placesUpdateBounds(bounds));
    dispatch(placesHasErrored(false));
    dispatch(placesIsLoading(true));

    service.nearbySearch(request, (places, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        dispatch(placeDetailsClose());
        dispatch(placesIsLoading(false));
        dispatch({
          type: PLACES_FETCH_DATA_SUCCESS,
          places
        });
      } else {
        dispatch(placesIsLoading(false));
        dispatch(placesHasErrored(true));
        console.log('places error status: ', status);
      }
    });
  }
}

export function placesFetchBookmarks(place_ids) {
  return (dispatch) => {
    const promises = place_ids.map(place_id => {
      return new Promise((resolve, reject) => {
        const request = { placeId: place_id };
        const service = new google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails(request, (place, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            dispatch(placesIsLoading(true));
            resolve(place);
          } else {
            reject();
          }
        });
      });
    });

    Promise.all(promises)
      .then(places => {
        dispatch({
          type: PLACES_FETCH_DATA_SUCCESS,
          places
        });
        dispatch(placesIsLoading(false));
        dispatch(placesHasErrored(false));
      })
      .catch(() => {
        dispatch(placesIsLoading(false));
        dispatch(placesHasErrored(true));
      });
  }
}

export function placesHasErrored(bool) {
  return {
    type: PLACES_HAS_ERRORED,
    hasErrored: bool
  }
}

export function placesIsLoading(bool) {
  return {
    type: PLACES_IS_LOADING,
    isLoading: bool
  }
}

export function placesSetHighlight(place_id, bool) {
  return {
    type: PLACES_HIGHLIGHTED,
    isHighlighted: bool,
    place_id
  }
}

export function placesUpdateBounds(bounds) {
  return {
    type: PLACES_GET_MAP_BOUNDS,
    bounds
  }
}

// PLACE DETAILS

export function placeDetailsFetchData(placeId) {
  return (dispatch) => {
    const request = { placeId };
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    dispatch(placeDetailsHasErrored(false));
    dispatch(placeDetailsIsLoading(true));

    service.getDetails(request, (place, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        dispatch(placeDetailsIsLoading(false));
        dispatch({
          type: PLACE_DETAILS_FETCH_DATA_SUCCESS,
          place
        });
      } else {
        dispatch(placeDetailsIsLoading(false));
        dispatch(placeDetailsHasErrored(true));
        console.log('place error status: ', status);
      }
    });
  }
}

export function placeDetailsHasErrored(bool) {
  return {
    type: PLACE_DETAILS_HAS_ERRORED,
    hasErrored: bool
  }
}

export function placeDetailsIsLoading(bool) {
  return {
    type: PLACE_DETAILS_IS_LOADING,
    isLoading: bool
  }
}

export function placeDetailsClose() {
  return {
    type: PLACE_DETAILS_CLOSE
  }
}
