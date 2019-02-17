import React from 'react';

import Constants from '../utils/constants.js';
import queryString from "query-string"

import Navbar from '../components/Navbar';
import Map from '../components/Map';
import Sidebar from '../components/Sidebar';

import { debounce } from "throttle-debounce";

const FIND_ADDRESS_URL = 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      coordinates: [],
      suggestions: [],
      showSuggestions: false,
      data: {}
    }

    // Used for autocomplete to prevent making a call every time state.address is changed
    this.autocompleteSearchDebounced = debounce(250, this.findAddressCandidates);
  }

  componentDidMount()  {
    const queries = queryString.parse(this.props.location.search);
    const address = queries.address;
    const x = queries.x;
    const y = queries.y;

    if (address === undefined || x === undefined || y === undefined) {
      // Go to the home page
      this.props.history.push(`/`);
    }

    this.setState({
      address,
      x,
      y
    });
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

  _updateData = (data) => {
    this.setState({
      data
    })
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
          document.location.reload();
        });
    } else {
      x = this.state.coordinates[0];
      y = this.state.coordinates[1];
      this.props.history.push(`/dashboard?address=${address}&x=${x}&y=${y}`);
      document.location.reload();
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
    return (
      <div>
        <Navbar
          address={this.state.address}
          updateAddress={this._updateAddress}
          searchAddress={this._searchAddress}
          hideSuggestionsAction={this._hideSuggestions}
          showSuggestionsAction={this._showSuggestions}
          showSuggestions={this.state.showSuggestions}
          selectSuggestion={this._selectSuggestion}
          suggestions={this.state.suggestions}
        />

        <div className="container-fluid main">
          <div className="row">
            <div className="col-8 map-col">
              <Map x={this.state.x} y={this.state.y} updateData={this._updateData}/>
            </div>

            <div className="col sidebar-col">
              <Sidebar data={this.state.data} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;
