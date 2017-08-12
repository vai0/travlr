import React, { Component } from 'react';

const Place = ({ place }) => {
  const { place_id, name, vicinity, opening_hours, rating, isHighlighted } = place;
  const className = (isHighlighted) ? "place place-highlighted" : "place";
  return (
    <div
      key={place_id}
      data-place-id={place_id}
      className={className}
      >
      {name}
    </div>
  );
};

export default Place;
