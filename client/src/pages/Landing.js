import React from 'react';

import Constants from '../utils/constants.js';

import { debounce } from "throttle-debounce";

const FIND_ADDRESS_URL = 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?';

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      coordinates: [],
      suggestions: [],
      showSuggestions: false
    }

    // Used for autocomplete to prevent making a call every time state.address is changed
    this.autocompleteSearchDebounced = debounce(250, this.findAddressCandidates);
  }

  // Ping Esri find candidate API
  findAddressCandidates = (address) => {
    fetch(`${FIND_ADDRESS_URL}f=json&Address=${address}&city=Los Angeles&region=CA`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          suggestions: data.candidates.slice(0,5)
        })
      });
  }

  _updateAddress = (event) => {
    const address = event.target.value;

    const showSuggestions = (address === undefined || address === '') ? (false) : (true);

    // Ping FIND_ADDRESS_URL and get results
    this.setState({
      address,
      showSuggestions
    }, () => {
      this.autocompleteSearchDebounced(this.state.address);
    });
  }

  _searchAddress = (event) => {
    event.preventDefault();

    const address = this.state.address;

    let x, y;

    // If the user didn't use autocomplete, we need to manually ping the Esri API and use the first result
    // Otherwise, we use whatever was selected and roll with it
    if (this.state.coordinates.length !== 2) {
      fetch(`${FIND_ADDRESS_URL}f=json&Address=${address}&city=Los Angeles&region=CA`)
        .then(response => response.json())
        .then(data => {
          x = data.candidates[0].location.x;
          y = data.candidates[1].location.y;
          this.props.history.push(`/dashboard?address=${address}&x=${x}&y=${y}`);
        });
    } else {
      x = this.state.coordinates[0];
      y = this.state.coordinates[1];
      this.props.history.push(`/dashboard?address=${address}&x=${x}&y=${y}`);
    }
  }

  _hideSuggestions = () => {
    this.setState({
      showSuggestions: false
    });
  }

  _showSuggestions = () => {
    this.setState({
      showSuggestions: true
    });
  }

  _selectSuggestion = (suggestion) => {
    this.setState({
      address: suggestion.address,
      coordinates: [suggestion.location.x, suggestion.location.y],
      showSuggestions: false
    })
  }

  render() {
    const suggestions = this.state.suggestions.map((suggestion, index) => {
      return (
        <div
          className="suggestion"
          key={suggestion.address + ' ' + index}
          onClick={() => { this._selectSuggestion(suggestion) }}
        >
          {suggestion.address}
        </div>
      )
    })

    const autocomplete = (this.state.showSuggestions) ? (
      <div className="search-suggestions">
        {suggestions}
      </div>
    ) : (null);

    return (
      <div className="landing h-100">
        <div className="container landing-container h-100">
          <div className="row landing-content align-items-center h-100">
            <div className="col">
              <img src="/logo.svg" alt="Live Safe LA" className="logo"/>
            </div>

            <div className="col">
              <p className="lead">{Constants.APP_TAGLINE}</p>

              <form onSubmit={this._searchAddress} className="search-form">
                <div className="input-group">
                  <input
                    type="text"
                    value={this.state.address}
                    className="form-control form-control-lg"
                    placeholder="1234 Main Street"
                    onChange = {this._updateAddress}
                    onFocus = {this._showSuggestions}
                  />

                  <div className="input-group-append">
                    <button className="btn btn-search btn-lg" type="button" onClick={this._searchAddress}>Search</button>
                  </div>
                </div>

                {autocomplete}
              </form>

              <p className="credit">{Constants.APP_CREDIT}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;
