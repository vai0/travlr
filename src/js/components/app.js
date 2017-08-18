import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLocation, resetPlacesAndPlaceDetails, removeMarkers, placesFetchBookmarks, bookmarksRefresh } from '../actions/index';
import SearchBar from './search_bar';
import Map from './map';
import PlacesList from './places_list';
import PlaceDetails from './place_details';
import AddLabel from './add_label';
import BookmarksList from './bookmarks_list';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddLabelPage: false,
      showBookMarksPanel: false
    }

    this._showAddLabelPage = this._showAddLabelPage.bind(this);
    this._showBookmarksPanel = this._showBookmarksPanel.bind(this);
    this._hideBookmarksPanel = this._hideBookmarksPanel.bind(this);
    this._closeLeftPanel = this._closeLeftPanel.bind(this);
    this._handleClickFetchBookmarks = this._handleClickFetchBookmarks.bind(this);
  }

  componentDidMount() {
    this.props.fetchLocation();
    this.props.bookmarksRefresh(this.props.bookmarks);
  }

  _showAddLabelPage(bool) {
    this.setState({
      showAddLabelPage: bool
    });
  }

  _showBookmarksPanel() {
    this.setState({
      showBookMarksPanel: true
    });
    this.props.bookmarksRefresh(this.props.bookmarks);
  }

  _hideBookmarksPanel() {
    this.setState({
      showBookMarksPanel: false
    });
  }

  _closeLeftPanel() {
    this.setState({
      showAddLabelPage: false
    });
    this.props.resetPlacesAndPlaceDetails();
    this.props.removeMarkers();
    const searchBar = document.querySelector('.search-bar input');
    searchBar.value = '';
  }

  _renderLeftPanel() {
    const { places, placeDetails } = this.props;
    if (this.state.showAddLabelPage) {
      return (
        <div className='left-panel'>
          <div className="search-bar-background"></div>
          <AddLabel showAddLabelPage={this._showAddLabelPage}/>
        </div>
      );
    } else if (placeDetails.place) {
      return (
        <div className='left-panel'>
          <PlaceDetails showAddLabelPage={this._showAddLabelPage} />
        </div>
      );
    } else if (places.places) {
      return (
        <div className='left-panel'>
          <div className="search-bar-background"></div>
          <PlacesList />
        </div>
      );
    } else {
      return null;
    }
  }

  _renderBookmarksPanel() {
    if (this.state.showBookMarksPanel) {
      return (
        <div className="bookmarks-panel">
          <div className="header">
            <button
              className="hide-bookmarks-button"
              onClick={this._hideBookmarksPanel}
            >
            </button>
            <div className="header-title">My Places</div>
          </div>
          <BookmarksList />
        </div>
      );
    }
    return null;
  }

  _handleClickFetchBookmarks(event) {
    const label = event.target.dataset.label;
    const places = this.props.bookmarks[label];
    const place_ids = Object.keys(places);
    this.props.placesFetchBookmarks(place_ids);
  }

  _renderQuickSearchButtons() {
    const { places, placeDetails } = this.props;
    if (!places.places && !placeDetails.place && !this.state.showAddLabelPage) {
      const bookmarks = this.props.bookmarks;
      return (
        <div className="quick-search-labels-container">
          {Object.keys(bookmarks).map(label => {
            return (
              <div
                className="quick-search-label"
                key={label}
                data-label={label}
                onClick={this._handleClickFetchBookmarks}
              >
                {label}
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  }

  _renderSearchButtonElement() {
    const { places, placeDetails } = this.props;
    return (
      <button
        className="close-left-panel-button"
        onClick={this._closeLeftPanel}
      >
      </button>
    );
  }

  _renderOverlay() {
    const { places, placeDetails } = this.props;
    return places.places || placeDetails.place || this.state.showAddLabelPage ?
      null : <div className="overlay"></div>;
  }

  _renderSearchBarContainer() {
    if (!this.state.showAddLabelPage) {
      return (
        <div className="search-bar-container">
          <SearchBar />
          {this._renderSearchButtonElement()}
        </div>
      );
    } else {
      return (
        <div className="search-bar-container">
        </div>
      );
    }
  }

  render() {
    return (
      <div className="app-container">
        {this._renderSearchBarContainer()}
        {this._renderQuickSearchButtons()}
        {this._renderLeftPanel()}
        {this._renderBookmarksPanel()}
        <button className="bookmarks-button" onClick={this._showBookmarksPanel}></button>
        {this._renderOverlay()}
        <Map />
      </div>
    );
  }
}

function mapStateToProps({ places, placeDetails, bookmarks }) {
  return {
    places,
    placeDetails,
    bookmarks
  };
}

export default connect(mapStateToProps, { fetchLocation, resetPlacesAndPlaceDetails, removeMarkers, placesFetchBookmarks, bookmarksRefresh })(App);
