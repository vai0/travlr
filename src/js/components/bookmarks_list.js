import React, { Component } from 'react';
import { connect } from 'react-redux';
import BookmarksCategory from './bookmarks_category';

class BookmarksList extends Component {
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

export default connect(mapStateToProps)(BookmarksList);
