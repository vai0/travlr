import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMapBounds, setMarkers } from '../actions/index';

class Map extends Component {
  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      center: { lat: 37.7749, lng: -122.419 },
      zoom: 13
    });

    this.setMapBounds();
    this.map.addListener('bounds_changed', () => this.setMapBounds());
    this.markerObjects = [];
  }

  setMapBounds() {
    this.props.setMapBounds(this.map.getBounds());
  }

  removeMarkerObjects() {
    this.markerObjects.forEach(marker => marker.setMap(null));
    this.markerObjects.length = 0;
  }

  componentWillReceiveProps(nextProps) {
    // center the map to the user's location after location is shared
    const { location, userCoordsReceived } = nextProps.userCoords;
    if (this.props.userCoords.userCoordsReceived !== userCoordsReceived) {
      this.map.panTo(location);
      this.setMapBounds();
    }

    // place markers on map for each place in Places reducer
    if (this.props.markers !== nextProps.markers) {
      this.removeMarkerObjects();
      for (let place_id in nextProps.markers) {
        const marker = new google.maps.Marker({
          position: nextProps.markers[place_id].location,
          map: this.map,
          title: 'Hello World!'
        });
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

function mapStateToProps(state) {
  return {
    userCoords: state.userCoords,
    markers: state.markers,
    places: state.places
  };
}

export default connect(mapStateToProps, { setMapBounds, setMarkers })(Map);
