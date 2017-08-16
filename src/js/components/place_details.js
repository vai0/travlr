import React, { Component } from 'react';
import { connect } from 'react-redux';
import { placeDetailsClose, bookmarksRemovePlace, setMarkers } from '../actions/index';
import { flattenBookmarks } from '../helpers';

class PlaceDetails extends Component {
  componentWillMount() {
    this.props.setMarkers(this.props.placeDetails.place);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.placeDetails.place !== nextProps.placeDetails.place) {
      this.props.setMarkers(this.props.placeDetails.place);
    }
  }

  _closePlaceDetails() {
    this.props.placeDetailsClose();
  }

  _showAddLabelPage() {
    this.props.showAddLabelPage(true);
  }

  _isBookmarked(place_id) {
    const flattened = flattenBookmarks(this.props.bookmarks);
    return flattened[place_id] ? true : false;
  }

  _flattenBookmarks(bookmarks) {
    let flattened = {};
    for (let label in bookmarks) {
      flattened = {
        ...flattened,
        ...bookmarks[label]
      };
    }
    return flattened;
  }

  _removeBookMark() {
    const place_id = this.props.placeDetails.place.place_id;
    if (this._isBookmarked(place_id)) {
      const label = this._fetchLabel();
      this.props.bookmarksRemovePlace(place_id, label);
    }
  }

  _fetchLabel() {
    const place_id = this.props.placeDetails.place.place_id;
    const flattened = flattenBookmarks(this.props.bookmarks);
    return flattened[place_id].label;
  }

  _renderLabel() {
    if (this._isBookmarked(this.props.placeDetails.place.place_id)) {
      const label = this._fetchLabel();
      return (
        <div>
          {label}
          <button onClick={this._removeBookMark.bind(this)}>X</button>
        </div>
      );
    } else {
      return <button onClick={this._showAddLabelPage.bind(this)}>Add Label</button>;
    }
  }

  render() {
    const { formatted_address, formatted_phone_number, name, opening_hours, photos, rating, website, url } = this.props.placeDetails.place;
    return (
      <div>
        <button onClick={this._closePlaceDetails.bind(this)}>Back</button>
        <br />
        <br />
        {name}<br />
        {formatted_address}<br />
        {formatted_phone_number}<br />
        {rating}<br />
        {website}<br />
        {url}<br
      />
        <br />
        <br />
        <br />
        {this._renderLabel()}
      </div>
    );
  }
}

function mapStateToProps({ placeDetails, places, bookmarks }) {
  return {
    placeDetails,
    places,
    bookmarks
  };
}

export default connect(mapStateToProps, { placeDetailsClose, bookmarksRemovePlace, setMarkers })(PlaceDetails);
