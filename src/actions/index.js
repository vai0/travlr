// import PromisedLocation from 'promised-location';

export const FETCH_LOCATION = 'FETCH_LOCATION';
export const SET_MAP_CENTER = 'SET_MAP_CENTER';
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
        dispatch(setMapCenter(location));
      });
    } else {
      console.log('fetchLocation error: ', error);
    }
  }

  // const locator = new PromisedLocation();
  // return locator
  //   .then(position => {
  //     return {
  //       type: FETCH_LOCATION,
  //       payload: {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude
  //       }
  //     }
  //   })
  //   .catch(error => {
  //     console.log('fetchLocation error: ', error);
  //     return {
  //       type: FETCH_LOCATION,
  //       payload: null
  //     }
  //   });
}

export function setMapCenter(coordinates) {
  return {
    type: SET_MAP_CENTER,
    payload: coordinates
  };
}

export function setMapBounds(bounds) {
  return {
    type: SET_MAP_BOUNDS,
    payload: bounds
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
