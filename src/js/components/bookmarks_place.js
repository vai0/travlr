import React, { Component } from 'react';

class BookmarksPlace extends Component {
  render() {
    const { name, formatted_address, opening_hours } = this.props.place;

    const renderOpenNow = opening_hours.open_now ?
      <div className="open-now">Open now</div> :
      <div className="closed-now">Closed</div>;

    return (
      <div>
        {name}<br />
        {formatted_address}<br />
        {renderOpenNow}
      </div>
    );
  }
}

export default BookmarksPlace;
