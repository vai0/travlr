import React, { Component } from 'react';

class Map extends Component {
  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      center: this.props.mapCenter,
      zoom: 11
    });
  }

  render() {
    return(
      <div className="google-map" ref="map"></div>
    );
  }
}

export default Map;
