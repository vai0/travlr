import React, { Component } from 'react';
import Rating from 'react-rating';

const Ratings = ({ rating }) => {
  if (rating) {
    return (
      <div className="rating">
        <Rating
          start={0}
          stop={5}
          placeholderRate={rating}
          placeholder={<div className="rating-star-filled"></div>}
          empty={<div className="rating-star-empty"></div>}
          readonly={true}
          fractions={0.1}
        />
        <span className="rating-numerical">
          {rating.toPrecision(2)}
        </span>
      </div>
    );
  }
  return null;
}

export default Ratings;
