import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bookmarksAddPlace } from '../actions/index';

class AddLabel extends Component {
  constructor(props) {
    super(props);

    this.labels = this._fetchExistingLabels();

    this.state = {
      labelType: 'new',
      labelName: this.labels[0]
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleLabelTypeChange = this._handleLabelTypeChange.bind(this);
    this._handleLabelNameChange = this._handleLabelNameChange.bind(this);
    this._createExistingLabelInput = this._createExistingLabelInput.bind(this);
  }

  _fetchExistingLabels() {
    return Object.keys(this.props.bookmarks);
  }

  _handleSubmit(event) {
    event.preventDefault();
    if (this.newLabel) {
      console.log('new label: ', this.newLabel.value);
      this.props.bookmarksAddPlace(this.props.placeDetails.place, this.newLabel.value);
    } else {
      console.log('existing label: ', this.state.labelName);
      this.props.bookmarksAddPlace(this.props.placeDetails.place, this.state.labelName);
    }
    this.props.showAddLabelPage(false);
  }

  _handleCancelButton(event) {
    this.props.showAddLabelPage(false);
  }

  _handleLabelTypeChange(event) {
    this.setState({
      labelType: event.target.value
    });
  }

  _handleLabelNameChange(event) {
    this.setState({
      labelName: event.target.value
    });
  }

  _createExistingLabelInput(label) {
    return (
      <label key={label}>
        {label}
        <input
          type="radio"
          value={label}
          name="labelName"
          checked={this.state.labelName === label}
          onChange={this._handleLabelNameChange}/>
      </label>
    );
  }

  _renderMoreOptions() {
    if (this.state.labelType === 'new') {
      return (
        <input
          type="text"
          placeholder="New label"
          ref={input => this.newLabel = input}
        />
      );
    } else {
      return this.labels.map(this._createExistingLabelInput);
    }
  }

  render() {
    const { name, formatted_address } = this.props.placeDetails.place;

    return (
      <div>
        <button onClick={this._handleCancelButton.bind(this)}>Back</button>
        <div>
          {name}<br />
          {formatted_address}
        </div>
        <br />
        <br />
        <br />
        <form onSubmit={this._handleSubmit}>
          <label>
            Create new
            <input
              type="radio"
              value="new"
              name="labelType"
              checked={this.state.labelType === 'new'}
              onChange={this._handleLabelTypeChange}/>
          </label>
          <label>
            Use existing label
            <input type="radio"
              value="existing"
              name="labelType"
              checked={this.state.labelType === 'existing'}
              onChange={this._handleLabelTypeChange}/>
          </label>
          <br />
          <br />
          <br />
          {this._renderMoreOptions()}
          <br />
          <br />
          <br />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ placeDetails, bookmarks }) {
  return {
    placeDetails,
    bookmarks
  };
}

export default connect(mapStateToProps, { bookmarksAddPlace })(AddLabel);
