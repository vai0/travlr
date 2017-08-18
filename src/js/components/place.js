import React, { Component } from 'react';
import { connect } from 'react-redux';
import { placeDetailsFetchData, setMarkerHighlight } from '../actions/index';
import { flattenBookmarks } from '../helpers';
import Ratings from './ratings';

class Place extends Component {
  handleClick() {
    this.props.placeDetailsFetchData(this.place.dataset.placeId);
  }

  _isBookmarked(place_id) {
    const flattened = flattenBookmarks(this.props.bookmarks);
    return flattened[place_id] ? true : false;
  }

  _renderLabel() {
    const place_id = this.props.place.place_id;
    if (this._isBookmarked(place_id)) {
      const flattened = flattenBookmarks(this.props.bookmarks);
      const label = flattened[place_id].label;
      return (
        <div className="place-label">
          <div className="place-label-icon"></div>
          <div className="place-label-name">{label}</div>
        </div>
      );
    }
  }

  _handleMouseEnter() {
    this.props.setMarkerHighlight(this.props.place.place_id, true);
  }

  _handleMouseLeave() {
    this.props.setMarkerHighlight(this.props.place.place_id, false);
  }

  render() {
    const { place_id, name, vicinity, opening_hours, rating, isHighlighted } = this.props.place;
    return (
      <div
        key={place_id}
        data-place-id={place_id}
        ref={(place) => { this.place = place }}
        className="place"
        onClick={this.handleClick.bind(this)}
        onMouseEnter={this._handleMouseEnter.bind(this)}
        onMouseLeave={this._handleMouseLeave.bind(this)}
      >
        <div className="left-side">
          <div className="name">{name}</div>
          <div className="vicinity">{vicinity}</div>
          <Ratings rating={rating} />
        </div>
        <div className="right-side">
          {this._renderLabel.call(this)}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ map, bookmarks }) {
  return {
    bounds: map.mapBounds,
    bookmarks
  };
}

export default connect(mapStateToProps, { placeDetailsFetchData, setMarkerHighlight })(Place);
