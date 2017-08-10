import React, { Component } from 'react';
import { connect } from 'react-redux';
import { placesFetchData } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };

    this._onInputChange = this._onInputChange.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
  }

  _onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  _onFormSubmit(event) {
    event.preventDefault();
    this.props.placesFetchData({
      keyword: this.state.term,
      bounds: this.props.mapBounds
    });
  }

  render() {
    return (
      <form onSubmit={this._onFormSubmit} className="search-bar">
        <input
          value={this.state.term}
          onChange={this._onInputChange}
        />
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    mapCenter: state.map.mapCenter,
    mapBounds: state.map.mapBounds
  }
}

export default connect(mapStateToProps, { placesFetchData })(SearchBar);
