import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLocation } from '../actions/index';
import SearchBar from './search_bar';
import Map from './map';
import PlacesList from './places_list';

class App extends Component {
  componentDidMount() {
    this.props.fetchLocation();
  }

  render() {
    return (
      <div>
        <SearchBar />
        <PlacesList />
        <Map />
      </div>
    );
  }
}

export default connect(null, { fetchLocation })(App);
