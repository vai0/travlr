export const FETCH_LOCATION = 'FETCH_LOCATION';
export const SET_MAP_BOUNDS = 'SET_MAP_BOUNDS';
export const PLACES_FETCH_DATA_SUCCESS = 'PLACES_FETCH_DATA_SUCCESS';
export const PLACES_HAS_ERRORED = 'PLACES_HAS_ERRORED';
export const PLACES_IS_LOADING = 'PLACES_IS_LOADING';
export const SET_MARKERS = 'SET_MARKERS';

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

export function setMapBounds(bounds) {
  return {
    type: SET_MAP_BOUNDS,
    bounds
  }
}

export function placesFetchData(request) {
  return (dispatch) => {
    dispatch(placesIsLoading(true));
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    service.nearbySearch(request, (places, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        dispatch(placesIsLoading(false));
        dispatch({
          type: PLACES_FETCH_DATA_SUCCESS,
          places
        });
        dispatch(setMarkers(places));
      } else {
        dispatch(placesHasErrored(true));
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
