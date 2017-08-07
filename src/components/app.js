import React, { Component } from 'react';

import SearchBar from './search_bar';
import Map from './map';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userCoords: { lat: 37.7749, lng: -122.4194 },
      userCoordsReceived: false,
      mapBounds: null,
      mapCenter: { lat: 37.7749, lng: -122.4194 },
      placeResults: [
        {
          place_id: '',
          name: '',
          opening_hours: '',
          vicinity: '',
          viewport: {},
          location: {}
        }
      ]
    }

    this._fetchPlaces = this._fetchPlaces.bind(this);
    this._setViewPortBounds = this._setViewPortBounds.bind(this);
    this._setViewPortCenter = this._setViewPortCenter.bind(this);
  }

  componentDidMount() {
    this._fetchGeolocation();
  }

  _fetchGeolocation () {
    if (navigator.geolocation) {
      const userCoords = {};
      navigator.geolocation.getCurrentPosition((position) => {
        userCoords.lat = position.coords.latitude;
        userCoords.lng = position.coords.longitude;
        this.setState({
          userCoords,
          userCoordsReceived: true
        });
      });
    } else {
      console.log('geolocation not supported!');
    }
  }

  _setPlaces(places) {
    const newPlaces = places.map(({ place_id, name, opening_hours, vicinity, geometry }) => {
      const northeast = geometry.viewport.getNorthEast();
      const southwest = geometry.viewport.getSouthWest();
      return {
        place_id,
        name,
        opening_hours,
        vicinity,
        viewport: { southwest, northeast }
      }
    });
    this.setState({ places: newPlaces });
    console.log('this.state.places: ', this.state.places);
  }

  _fetchPlaces(keyword) {
    // console.log('keyword in fetchPlaces: ', keyword);
    const request = {
      keyword,
      location: this.state.mapCenter,
      radius: 40233
    };

    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.nearbySearch(request, (placeResults, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        this._setPlaces(places: placeResults);
        console.log('places: ', places);
      } else {
        console.log('ERROR - PlacesServiceStatus: ', status);
      }
    });
  }

  _setViewPortBounds(bounds) {
  }

  _setViewPortCenter() {
  }

  render() {
    return (
      <div>
        <SearchBar fetchPlaces={this._fetchPlaces}/>
        <Map
          mapCenter={this.state.mapCenter}
          mapBounds={this.state.mapBounds}
        />
      </div>
    );
  }
}
