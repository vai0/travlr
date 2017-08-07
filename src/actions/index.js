export const FETCH_LOCATION = 'FETCH_LOCATION';

export function fetchLocation() {
  if (navigator.geolocation) {
    const userCoords = {};
    navigator.geolocation.getCurrentPosition((position) => {
      userCoords.lat = position.coords.latitude;
      userCoords.lng = position.coords.longitude;

      return {
        request: FETCH_LOCATION,
        payload: userCoords
      }
      this.setState({
        userCoords,
        userCoordsReceived: true
      });
    });
  } else {
    console.log('geolocation not supported!');
  }
}
