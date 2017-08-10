import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLocation } from '../actions/index';
import SearchBar from './search_bar';
import Map from './map';

class App extends Component {
  componentDidMount() {
    this.props.fetchLocation();
  }

  render() {
    return (
      <div>
        <SearchBar />
        <Map />
      </div>
    );
  }
}

export default connect(null, { fetchLocation })(App);
