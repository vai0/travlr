import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLocation } from '../actions/index';
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
  }

  componentDidMount() {
    this.props.fetchLocation();
  }

  _showAddLabelPage(bool) {
    this.setState({ showAddLabelPage: bool });
  }

  _showBookmarksPanel() {
    this.setState({
      showBookMarksPanel: true
    });
  }

  _hideBookmarksPanel() {
    this.setState({
      showBookMarksPanel: false
    });
  }

  render() {
    const { places, placeDetails } = this.props;
    let leftPanelContent;
    let bookmarksPanel;
    let className = 'left-panel';

    if (this.state.showAddLabelPage) {
      leftPanelContent = <AddLabel showAddLabelPage={this._showAddLabelPage}/>;
    } else if (placeDetails.place) {
      leftPanelContent = <PlaceDetails showAddLabelPage={this._showAddLabelPage} />;
    } else if (places.places) {
      leftPanelContent = <PlacesList />;
    } else {
      className = 'left-panel closed';
    }

    if (this.state.showBookMarksPanel) {
      bookmarksPanel = (
        <div className="bookmarks-panel">
          <div className="header">
            <button onClick={this._hideBookmarksPanel}>X</button>
            My Places
          </div>
          <BookmarksList />
        </div>
      );
    }

    return (
      <div className="app-container">
        <SearchBar />
        <div className={className}>
          <div className="search-bar-background"></div>
          {leftPanelContent}
        </div>
        <button className="bookmarks-button" onClick={this._showBookmarksPanel}>Bookmarks</button>
        {bookmarksPanel}
        <Map />
      </div>
    );
  }
}



function mapStateToProps({ places, placeDetails }) {
  return {
    places,
    placeDetails
  };
}

export default connect(mapStateToProps, { fetchLocation })(App);
