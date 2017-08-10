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

function mapStateToProps({ userCoords }) {
  return {
    userCoords
  };
}

export default connect(mapStateToProps, { fetchLocation })(App);
