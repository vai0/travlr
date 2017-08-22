import React, { Component } from 'react';
import { connect } from 'react-redux';
import { placeDetailsClose, bookmarksRemovePlace, setMarkers } from '../actions/index';
import { flattenBookmarks } from '../helpers';
import Ratings from './ratings';
import axios from 'axios';

class PlaceDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoUrl: ''
    }
  }

  componentWillMount() {
    this.props.setMarkers(this.props.placeDetails.place);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.placeDetails.place !== nextProps.placeDetails.place) {
      this.props.setMarkers(nextProps.placeDetails.place);
    }
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
        <div className="sub-section">
          <div className="header">Label</div>
          <div className="label-tag">
            <span>{label}</span>
            <button onClick={this._removeBookMark.bind(this)}></button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="sub-section">
          <div className="header">Label</div>
          <button className="add-label" onClick={this._showAddLabelPage.bind(this)}>
            + Add Label
          </button>
        </div>
      );
    }
  }

  _copyUrlToClipBoard() {
    const { url } = this.props.placeDetails.place;
    if (window.clipboardData && window.clipboardData.setData) {
      // IE specific code path to prevent textarea being shown while dialog is visible.
      return clipboardData.setData("Text", url);

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
      var textarea = document.createElement("textarea");
      textarea.textContent = url;
      textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
          return document.execCommand("copy");  // Security exception may be thrown by some browsers.
      } catch (ex) {
          console.warn("Copy to clipboard failed.", ex);
          return false;
      } finally {
          document.body.removeChild(textarea);
      }
    }
  }

  render() {
    const { vicinity, formatted_phone_number, name, opening_hours, photos, rating, website, url, place_id } = this.props.placeDetails.place;
    let photoUrl = 'http://www.sftravel.com/sites/sftraveldev.prod.acquia-sites.com/files/field/image/158827123_thinkstock_stdlc.jpg';
    if (photos) {
      if (photos.length > 0) {
        const randomNum = Math.floor(Math.random() * photos.length);
        if (photos[randomNum].getUrl) {
          photoUrl = photos[randomNum].getUrl({'maxWidth': 440});
        }
      }
    }
    return (
      <div className="place-details">
        <div className="photo-header">
          <img src={photoUrl} className="photo"/>
        </div>
        <div className="place-main-info">
          <div className="name">{name}</div>
          <div className="vicinity">{vicinity}</div>
          <Ratings rating={rating} />
        </div>
        <div className="place-other-info">
          <div className="sub-section">
            <div className="header">Website</div>
            <div className="info">
              <a className="ellipsis" target="_blank" href={website}>{website}</a>
            </div>
          </div>
          <div className="sub-section">
            <div className="header">Phone</div>
            <div className="info">{formatted_phone_number}</div>
          </div>
        </div>
        <div className="place-last-info">
          {this._renderLabel()}
          <div className="sub-section">
            <div className="header">Share</div>
            <div className="info">
              <div className="share-link">
                <input defaultValue={url} />
                <button onClick={this._copyUrlToClipBoard.bind(this)}>Copy Link</button>
              </div>
            </div>
          </div>
        </div>
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
