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
      <div className="container landing-container h-100">
        <div className="row landing-content align-items-center h-100">
          <div className="col">
            <img src="/logo.svg" href="Live Safe LA" className="logo"/>
          </div>

          <div className="col">
            <p className="lead">{Constants.APP_TAGLINE}</p>

            <form onSubmit={this._searchAddress}>
              <div className="input-group">
                <input type="text" className="form-control form-control-lg" placeholder="1234 Main Street" onChange = {this._updateAddress} />

                <div className="input-group-append">
                  <button className="btn btn-search btn-lg" type="button" onClick={this._searchAddress}>Search</button>
                </div>
              </div>
            </form>

            <p className="credit">{Constants.APP_CREDIT}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;
