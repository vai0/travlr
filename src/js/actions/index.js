export const FETCH_LOCATION = 'FETCH_LOCATION';
export const CURRENT_MAP_BOUNDS = 'CURRENT_MAP_BOUNDS';
export const PLACES_FETCH_DATA_SUCCESS = 'PLACES_FETCH_DATA_SUCCESS';
export const PLACES_HAS_ERRORED = 'PLACES_HAS_ERRORED';
export const PLACES_IS_LOADING = 'PLACES_IS_LOADING';
export const PLACES_GET_MAP_BOUNDS = 'PLACES_GET_MAP_BOUNDS';
export const SET_MARKERS = 'SET_MARKERS';
export const PLACES_HIGHLIGHTED = 'PLACES_HIGHLIGHTED';
export const PLACE_DETAILS_FETCH_DATA_SUCCESS = 'PLACE_DETAILS_FETCH_DATA_SUCCESS';
export const PLACE_DETAILS_HAS_ERRORED = 'PLACE_DETAILS_HAS_ERRORED';
export const PLACE_DETAILS_IS_LOADING = 'PLACE_DETAILS_IS_LOADING';
export const PLACE_DETAILS_CLOSE = 'PLACE_DETAILS_CLOSE';
export const BOOKMARKS_ADD_PLACE = 'BOOKMARKS_ADD_PLACE';
export const BOOKMARKS_REMOVE_PLACE = 'BOOKMARKS_REMOVE_PLACE';

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

// MAP STUFF

export function fetchLocation() {
  return (dispatch) => {
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
  places.forEach((place) => {
    markers[place.place_id] = {
      place_id: place.place_id,
      location: place.geometry.location,
      isHighlighted: false
    };
  });
  return {
    type: SET_MARKERS,
    markers
  };
}

// PLACES RESULTS LIST

export function placesFetchData(request, bounds) {
  return (dispatch) => {
    dispatch(placesUpdateBounds(bounds));
    dispatch(placesHasErrored(false));
    dispatch(placesIsLoading(true));
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    service.nearbySearch(request, (places, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        dispatch({
          type: PLACES_FETCH_DATA_SUCCESS,
          places
        });
        dispatch(placeDetailsClose());
        dispatch(placesIsLoading(false));
        dispatch(setMarkers(places));
      } else {
        dispatch(placesHasErrored(true));
        console.log('places error status: ', status);
      }
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
    dispatch(placeDetailsHasErrored(false));
    dispatch(placeDetailsIsLoading(true));
    const request = { placeId };
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    service.getDetails(request, (place, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        dispatch({
          type: PLACE_DETAILS_FETCH_DATA_SUCCESS,
          place
        });
        dispatch(placeDetailsIsLoading(false));
      } else {
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
