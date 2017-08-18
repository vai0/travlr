import React, { Component } from 'react';
import { connect } from 'react-redux';
import { placesFetchData, placeDetailsClose } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  componentDidMount() {
    this.input.focus();
    const { placeDetails } = this.props;
    if (placeDetails) this.input.style.paddingLeft = '50px';
  }

  componentDidUpdate(prevProps) {
    const { placeDetails } = this.props;
    this.input.style.paddingLeft = placeDetails ? '50px' : '22px';
  }

  _onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  _handleSubmit(event) {
    event.preventDefault();
    if (this.state.term !== '') {
      this.props.placesFetchData({
        keyword: this.state.term,
        bounds: this.props.mapBounds
      }, this.props.mapBounds);
    }
  }

  _closePlaceDetails() {
    this.props.placeDetailsClose();
  }

  _renderClosePlaceDetailsButton() {
    if (this.props.placeDetails) {
      return (
        <button
          className="close-place-details-button"
          onClick={this._closePlaceDetails.bind(this)}
        >
        </button>
      );
    }
  }


  render() {
    return (
      <form onSubmit={this._handleSubmit.bind(this)} className="search-bar">
        {this._renderClosePlaceDetailsButton()}
        <input
          value={this.state.term}
          onChange={this._onInputChange.bind(this)}
          ref={input => this.input = input}
          placeholder="Search and bookmark places..."
        />
      <button className="search-icon-button"></button>
      </form>
    );
  }
}

function mapStateToProps({ map, placeDetails }) {
  return {
    mapCenter: map.mapCenter,
    mapBounds: map.mapBounds,
    placeDetails: placeDetails.place
  }
}

export default connect(mapStateToProps, { placesFetchData, placeDetailsClose })(SearchBar);
