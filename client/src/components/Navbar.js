import React from 'react';

export default class Navbar extends React.Component {
  render() {
    const suggestions = this.props.suggestions.map((suggestion, index) => {
      return (
        <div
          className="suggestion"
          key={suggestion.address + ' ' + index}
          onClick={() => { this.props.selectSuggestion(suggestion) }}
        >
          {suggestion.address}
        </div>
      )
    })

    const autocomplete = (this.props.showSuggestions) ? (
      <div className="search-suggestions">
        {suggestions}
      </div>
    ) : (null);

    return (
      <nav className="navbar fixed-top navbar-red justify-content-start">
        <a className="navbar-brand" href="/"><img src="/navbar_logo.svg" alt="LiveSafe LA" /></a>

        <form className="form-inline search-form" onSubmit={this.props.searchAddress}>
          <div className="input-group">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={this.props.address}
              onChange = {this.props.updateAddress}
              onFocus = {this.props.showSuggestionsAction}
            />

            <div className="input-group-append">
              <button className="btn btn-search my-2 my-sm-0" type="submit" onClick={this.props.searchAddress}>Search</button>
            </div>
          </div>

          {autocomplete}
        </form>

        <a className="btn btn-outline-light signup-btn" href="#">Sign Up</a>
      </nav>
    )
  }
}
