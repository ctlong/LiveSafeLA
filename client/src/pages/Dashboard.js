import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Constants from '../utils/constants.js';
import queryString from "query-string"

import Navbar from '../components/Navbar';
import Map from '../components/Map';
import Sidebar from '../components/Sidebar';

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
        <Navbar updateAddress={this._updateAddress} searchAddress={this._searchAddress} />

        <div className="container-fluid fill">
          <div className="row">
            <div className="col-8 map-col">
              <Map />
            </div>

            <div className="col sidebar-col">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;
