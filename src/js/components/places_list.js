import React, { Component } from 'react';
import { connect } from 'react-redux';
import Place from './place';

const PlacesList = ({ placesList }) => {
  const { isLoading, hasErrored, places } = placesList;
  let renderPlaces;
  if (isLoading) {
    renderPlaces = (<span>Loading...</span>);
  } else if (hasErrored) {
    renderPlaces = (<span>Error!</span>);
  } else if (places) {
    renderPlaces = Object.keys(places).map(place_id => {
      return <Place place={places[place_id]} key={place_id} />
    });
  } else {
    renderPlaces = '';
  }

  console.log('renderPlaces: ', renderPlaces);

  return (
    <div className="places-list-container">
      <div className="search-bar-background"></div>
      <div className="places-list">
        {renderPlaces}
      </div>
    </div>
  );
}

function mapStateToProps({ places }) {
  return {
    placesList: places
  };
}

export default connect(mapStateToProps)(PlacesList);
