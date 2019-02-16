import React from 'react';

import Constants from '../utils/constants.js';

export default (props) => (
  <nav className="navbar fixed-top navbar-red justify-content-start">
    <a className="navbar-brand" href="/"><img src="/navbar_logo.svg" alt="LiveSafe LA" /></a>

    <form className="form-inline search-form" onSubmit={props.searchAddress}>
      <div className="input-group">
        <input className="form-control" type="search" placeholder="Search" aria-label="Search" onChange = {props.updateAddress}/>

        <div className="input-group-append">
          <button className="btn btn-search my-2 my-sm-0" type="submit" onClick={props.searchAddress}>Search</button>
        </div>
      </div>
    </form>

    <a className="btn btn-outline-light signup-btn" href="#">Sign Up</a>
  </nav>
)
