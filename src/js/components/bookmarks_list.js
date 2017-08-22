import React, { Component } from 'react';
import { connect } from 'react-redux';
import BookmarksCategory from './bookmarks_category';
import { bookmarksRefresh } from '../actions/index';
import { flattenBookmarks } from '../helpers';

class BookmarksList extends Component {
  componentDidMount() {
    const flattened = flattenBookmarks(this.props.bookmarks);
    const place_ids = Object.keys(flattened);
    const bookmarks = place_ids.map(place_id => {
      return {
        place_id,
        label: flattened[place_id].label
      }
    });
    this.props.bookmarksRefresh(bookmarks);
  }

  _renderBookMarkCategories() {
    const bookmarks = this.props.bookmarks;
    return Object.keys(bookmarks).map(label => {
      const category = bookmarks[label];
      return <BookmarksCategory key={label} label={label} category={category} />;
    });
  }

  render() {
    return (
      <div className="bookmarks-list-container">
        {this._renderBookMarkCategories()}
      </div>
    );
  }
}

function mapStateToProps({ bookmarks }) {
  return {
    bookmarks
  };
}

export default connect(mapStateToProps, { bookmarksRefresh })(BookmarksList);
