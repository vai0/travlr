import React, { Component } from 'react';
import { connect } from 'react-redux';
import { placeDetailsFetchData } from '../actions/index';
import { flattenBookmarks } from '../helpers';

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
      return <div>{label}</div>;
    }
  }

  render() {
    const { place_id, name, vicinity, opening_hours, rating, isHighlighted } = this.props.place;
    const className = (isHighlighted) ? "place place-highlighted" : "place";
    return (
      <div
        key={place_id}
        data-place-id={place_id}
        ref={(place) => { this.place = place }}
        className={className}
        onClick={this.handleClick.bind(this)}>
        {name}<br />
        {vicinity}<br />
        {rating}
        <br />
        <br />
        {this._renderLabel.call(this)}
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

export default connect(mapStateToProps, { placeDetailsFetchData })(Place);
