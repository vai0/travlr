import React, { Component } from 'react';
import { connect } from 'react-redux';
import Place from './place';
import { setMarkers } from '../actions/index';

class PlacesList extends Component {
  componentWillMount() {
    this._setMarkers();
    console.log('places_list: WILLMOUNT');
  }

  componentWillReceiveProps(next) {
    this._setMarkers();
    console.log('places_list: WILLRECEIVEPROPS');
  }

  _setMarkers() {
    const places = this.props.placesList.places;
    const placesArr = Object.keys(places).map(place_id => places[place_id]);
    this.props.setMarkers(placesArr);
  }

  render() {
    const { isLoading, hasErrored, places } = this.props.placesList;
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

    return (
      <div className="places-list-container">
        <div className="places-list">
          {renderPlaces}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ places }) {
  return {
    placesList: places
  };
}

export default connect(mapStateToProps, { setMarkers })(PlacesList);
