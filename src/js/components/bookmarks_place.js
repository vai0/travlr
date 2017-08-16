import React, { Component } from 'react';
import { connect } from 'react-redux';
import { placeDetailsFetchData } from '../actions/index';

class BookmarksPlace extends Component {
  _handleClick(event) {
    this.props.placeDetailsFetchData(this.props.place.place_id);
  }

  render() {
    const { name, vicinity, opening_hours } = this.props.place;

    const renderOpenNow = opening_hours.open_now ?
      <div className="open-now">Open now</div> :
      <div className="closed-now">Closed</div>;

    return (
      <div onClick={this._handleClick.bind(this)} className="bookmarks-place">
        {name}<br />
        {vicinity}<br />
        {renderOpenNow}
      </div>
    );
  }
}

export default connect(null, { placeDetailsFetchData })(BookmarksPlace);
