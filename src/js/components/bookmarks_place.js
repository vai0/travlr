import React, { Component } from 'react';
import { connect } from 'react-redux';
import { placeDetailsFetchData, bookmarksRemovePlace } from '../actions/index';

class BookmarksPlace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false
    }
  }

  _fetchPlaceDetail(event) {
    this.props.placeDetailsFetchData(this.props.place.place_id);
  }

  _removeBookmark() {
    const { place_id, label } = this.props.place;
    this.props.bookmarksRemovePlace(place_id, label);
  }

  _renderControls() {
    if (this.state.hovered) {
      return (
        <div className="right-section">
          <button className="remove-place-button" onClick={this._removeBookmark.bind(this)}>
          </button>
        </div>
      );
    } else {
      return null;
    }
  }

  _handleMouseEnter() {
    this.setState({
      hovered: true
    });
  }

  _handleMouseLeave() {
    this.setState({
      hovered: false
    });
  }

  render() {
    const { name, vicinity, opening_hours } = this.props.place;

    const renderOpenNow = opening_hours.open_now ?
      <div className="open-now">Open now</div> :
      <div className="closed-now">Closed</div>;

    return (
      <div
        className="bookmarks-place"
        onMouseEnter={this._handleMouseEnter.bind(this)}
        onMouseLeave={this._handleMouseLeave.bind(this)}
      >
        <div className="left-section" onClick={this._fetchPlaceDetail.bind(this)}>
          <div className="name">{name}</div>
          <div className="vicinity">{vicinity}</div>
          <div className="open-now">{renderOpenNow}</div>
        </div>
        {this._renderControls()}
      </div>
    );
  }
}

export default connect(null, { placeDetailsFetchData, bookmarksRemovePlace })(BookmarksPlace);
