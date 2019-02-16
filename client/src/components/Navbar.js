import React from 'react';

import Constants from '../utils/constants.js';

export default (props) => (
  <nav className="navbar fixed-top navbar-light bg-light">
    <a className="navbar-brand" href="/">{Constants.APP_NAME}</a>

    <form className="form-inline" onSubmit={props.searchAddress}>
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange = {props.updateAddress}/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={props.searchAddress}>Search</button>
    </form>

    <a className="btn btn-primary" href="#">Sign Up</a>
  </nav>
)
