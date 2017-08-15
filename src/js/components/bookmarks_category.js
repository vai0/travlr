import React, { Component } from 'react';
import BookmarksPlace from './bookmarks_place.js';

const BookmarksCategory = ({ label, category }) => {
  return (
    <div>
      {label}<br />
      {Object.keys(category).map(place_id => {
        const place = category[place_id];
        return <BookmarksPlace key={place_id} place={place} />;
      })}
    </div>
  );
}

export default BookmarksCategory;
