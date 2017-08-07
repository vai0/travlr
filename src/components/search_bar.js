import React, { Component } from 'react';

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
    this.props.fetchPlaces(this.state.term);
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

export default SearchBar;
