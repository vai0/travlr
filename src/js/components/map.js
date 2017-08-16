import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentMapBounds, setMarkers, placesSetHighlight } from '../actions/index';

class Map extends Component {
  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      center: { lat: 37.7749, lng: -122.419 },
      zoom: 13
    });

    this._bindMapBounds();
    this.map.addListener('bounds_changed', () => this._bindMapBounds());
    this.markerObjects = [];
  }

  _bindMapBounds() {
    this.props.currentMapBounds(this.map.getBounds());
  }

  _removeMarkerObjects() {
    this.markerObjects.forEach(marker => marker.setMap(null));
    this.markerObjects.length = 0;
  }

  componentWillReceiveProps(nextProps) {
    // center the map to the user's location after geolocation is shared
    const { location, userCoordsReceived } = nextProps.userCoords;
    if (this.props.userCoords.userCoordsReceived !== userCoordsReceived) {
      this.map.panTo(location);
      this._bindMapBounds();
    }

    // when place details is open, center map on that location
    if (!this.props.placeDetails.place && nextProps.placeDetails.place) {
      this.map.panTo(nextProps.placeDetails.place.geometry.location);
    }

    // when placeDetails is closed, pan map back to the bounds when places query was made
    if (
      this.props.placeDetails.place &&
      !nextProps.placeDetails.place &&
      nextProps.places.places &&
      nextProps.places.mapBounds
    ) {
      this.map.panToBounds(nextProps.places.mapBounds);
    }

    // place markers on map for each place in Places reducer
    if (this.props.markers !== nextProps.markers) {
      this._removeMarkerObjects();
      for (let place_id in nextProps.markers) {
        const marker = new google.maps.Marker({
          position: nextProps.markers[place_id].location,
          map: this.map
        });
        marker.place_id = place_id;
        // marker.addListener('mouseover', () => this.props.placesSetHighlight(place_id, true));
        // marker.addListener('mouseout', () => this.props.placesSetHighlight(place_id, false));
        this.markerObjects.push(marker);
      }
    }
  }

  render() {
    return(
      <div className="google-map" ref="map"></div>
    );
  }
}

function mapStateToProps({ userCoords, markers, places, placeDetails, map }) {
  return {
    userCoords,
    markers,
    places,
    placeDetails,
    map
  };
}

export default connect(mapStateToProps, { currentMapBounds, setMarkers, placesSetHighlight })(Map);
