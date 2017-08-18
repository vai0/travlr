import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bookmarksAddPlace } from '../actions/index';
import Ratings from './ratings';

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
      <div key={label}>
        <label className="existing-label">
          <input
            type="radio"
            value={label}
            name="labelName"
            className="existing-label-input"
            checked={this.state.labelName === label}
            onChange={this._handleLabelNameChange}/>
          <div className="existing-label-checked">{label}</div>
        </label>
      </div>
    );
  }

  _renderMoreOptions() {
    if (this.state.labelType === 'new') {
      return (
        <input
          type="text"
          placeholder="New label"
          className="new-label-input"
          ref={input => this.newLabel = input}
        />
      );
    } else {
      return (
        <div className="existing-label-container">
          {this.labels.map(this._createExistingLabelInput)}
        </div>
      );
    }
  }

  render() {
    const { name, vicinity, rating } = this.props.placeDetails.place;

    return (
      <div className="add-label-container">
        <div className="place-main-info">
          <div className="name">{name}</div>
          <div className="vicinity">{vicinity}</div>
          <Ratings rating={rating} />
        </div>
        <form className="label-form" onSubmit={this._handleSubmit}>
          <label className="label-type">
            <input
              type="radio"
              value="new"
              name="labelType"
              checked={this.state.labelType === 'new'}
              onChange={this._handleLabelTypeChange}/>
            <span>Create new</span>
            <div className="label-type-radio-button"></div>
          </label>
          <label className="label-type">
            <input type="radio"
              value="existing"
              name="labelType"
              checked={this.state.labelType === 'existing'}
              onChange={this._handleLabelTypeChange}/>
            <span>Use existing label</span>
            <div className="label-type-radio-button"></div>
          </label>
          {this._renderMoreOptions()}
          <button className="label-submit-button" type="submit">Save</button>
        </form>
        <button onClick={this._handleCancelButton.bind(this)}>Back</button>
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
