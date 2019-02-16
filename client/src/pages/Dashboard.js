import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Constants from '../utils/constants.js';
import queryString from "query-string"

class Dashboard extends React.Component {
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
    window.location.href = '/dashboard?address=' + this.state.address;
  }

  render() {
    const values = queryString.parse(this.props.location.search)
    const address = values.address;

    return (
      <div>
        <nav className="navbar fixed-top navbar-light bg-light">
          <a className="navbar-brand" href="/">{Constants.APP_NAME}</a>

          <form className="form-inline" onSubmit={this._searchAddress}>
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange = {this._updateAddress}/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this._searchAddress}>Search</button>
          </form>

          <a className="btn btn-primary" href="#">Sign Up</a>
        </nav>

        <div className="container-fluid fill">
          <div className="row">
            <div className="col-8 map-col">
              <div className="map" />
            </div>

            <div className="col sidebar-col">
              <div className="sidebar">
                <div className="sidebar-section">
                  <h2>Rating</h2>
                  <p><b>3/5</b> This area is alright. Some crimes. Be safe out there. Watch your back. Call 911 if there is an emergency.</p>

                  <h3>Comparison</h3>
                  <p>Compared to nearby neighborhoods, your neighborhood is <em>relatively better</em></p>
                </div>

                <div className="sidebar-section">
                  <h2>Top Concerns</h2>

                  <ul>
                    <li>
                      <h3>Homicides</h3>

                      <p>There's been a couple homicides in this area, I'd be careful if I were you.</p>
                    </li>

                    <li>
                      <h3>Assaults</h3>

                      <p>There's been a couple assaults in this area, I'd be careful if I were you.</p>
                    </li>

                    <li>
                      <h3>Burglaries</h3>

                      <p>There's been a couple burglaries in this area, I'd be careful if I were you.</p>
                    </li>

                    <li>
                      <h3>Arsons</h3>

                      <p>There's been a couple arsons in this area, I'd be careful if I were you.</p>
                    </li>
                  </ul>
                </div>

                <div className="sidebar-section">
                  <h2>Statistics</h2>

                  <p>More statistics would go here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;
