import React, { Component } from 'react';
import { connect } from 'react-redux';
import { placesFetchData } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  _onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  _handleSubmit(event) {
    event.preventDefault();
    this.props.placesFetchData({
      keyword: this.state.term,
      bounds: this.props.mapBounds
    }, this.props.mapBounds);
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit.bind(this)} className="search-bar">
        <input
          value={this.state.term}
          onChange={this._onInputChange.bind(this)}
        />
      </form>
    );
  }
}

function mapStateToProps({ map }) {
  return {
    mapCenter: map.mapCenter,
    mapBounds: map.mapBounds
  }
}

export default connect(mapStateToProps, { placesFetchData })(SearchBar);
