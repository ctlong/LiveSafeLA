import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Constants from '../utils/constants.js';

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: ''
    }
  }

  _updateAddress = (event) => {
    this.setState({
      address: event.target.value
    });
  }

  _searchAddress = (event) => {
    event.preventDefault();
    this.props.history.push('/dashboard?address=' + this.state.address);
  }

  render() {
    return (
      <div className="container landing-container">
        <h1>{Constants.APP_NAME}</h1>
        <p className="lead">Get started and enter an address in Los Angeles ☀️</p>

        <form onSubmit={this._searchAddress}>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="1234 Main Street" onChange = {this._updateAddress} />

            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" onClick={this._searchAddress}>Search</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Landing;
