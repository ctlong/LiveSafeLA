import React from 'react';

// At 4 or 5: show homicides, assaults, burglaries, arsons
// At 3: show assaults, burglaries, theft
// At 1 and 2: show theft, pickpocketing
// At 0: none, just be wary and use common sense

import moment from 'moment';

const CRIME_CATEGORIES = [
  'Arson',
  'Assault',
  'Bike Theft',
  'Burglary',
  'Disturbing the Peace',
  'DUI/Reckless Driving',
  'Homicide',
  'Pickpocketing/Purse-Snatching',
  'Robbery',
  'Sex Crimes',
  'Theft/Larceny',
  'Vandalism',
  'Vehicle Break-In',
  'Vehicle Theft'
];

export default (props) => {
  let topConcerns = [];

  if (props.data.Rating >= 4) {
    topConcerns = [
      {
        title: 'Homicides',
        content: `
          Based off our records, there is a track record of homicides in your area.
          As a result, please exercise caution and be wary of your surroundings.
        `
      },
      {
        title: 'Assaults',
        content: `
          Assaults are common in this area. When walking around, exercise caution.
        `
      },
      {
        title: 'Burglaries',
        content: `
          Secure your home with home security equipment. When leaving home, make sure
          doors are secured.
        `
      },
      {
        title: 'Car Break Ins',
        content: `
          Do not leave any valuable items in plain sight. Store valuable items in the
          glove compartment and always lock your car if possible.
        `
      }
    ]
  } else if (props.data.rating == 3) {
    topConcerns = [
      {
        title: 'Assaults',
        content: `
          Assaults are common in this area. When walking around, exercise caution.
        `
      },
      {
        title: 'Burglaries',
        content: `
          Secure your home with home security equipment. When leaving home, make sure
          doors are secured.
        `
      },
      {
        title: 'Car Break Ins',
        content: `
          Do not leave any valuable items in plain sight. Store valuable items in the
          glove compartment and always lock your car if possible.
        `
      },
      {
        title: 'Theft',
        content: `
          Theft and larceny is common in this area. Watch your valuables and keep track
          of your posessions at all times.
        `
      }
    ]
  } else if (props.data.rating == 0) {
    topConcerns = [
      {
        title: 'None',
        content: `
          There are little to no concerns about crime in this area.
        `
      }
    ]
  } else {
    topConcerns = [
      {
        title: 'Theft',
        content: `
          Theft and larceny is common in this area. Watch your valuables and keep track
          of your posessions at all times.
        `
      }
    ]
  }

  const topConcernsOutput = topConcerns.map((concern, index) => (
    <div className="concern" key={index}>
      <h3>{concern.title}</h3>

      <p>{concern.content}</p>
    </div>
  ))

  if (!props.dataLoaded) {
      return (
        <div className="sidebar d-flex align-items-center justify-content-center h-100">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )
  }

  let ratingMessage;

  if (props.data.Rating == 5) {
    ratingMessage = (
      <div className="alert alert-danger" role="alert">
        <h3>LiveSafe LA Score: {props.data.Rating}/5</h3>
        {props.data.RatingMessage}
      </div>
    )
  } else if (props.data.Rating < 5 && props.data.Rating >= 3) {
    ratingMessage = (
      <div className="alert alert-warning" role="alert">
        <h3>LiveSafe LA Score: {props.data.Rating}/5</h3>
        {props.data.RatingMessage}
      </div>
    )
  } else if (props.data.Rating < 3 && props.data.Rating >= 1){
    ratingMessage = (
      <div className="alert alert-dark" role="alert">
        <h3>LiveSafe LA Score: {props.data.Rating}/5</h3>
        {props.data.RatingMessage}
      </div>
    )
  } else {
    ratingMessage = (
      <div className="alert alert-info" role="alert">
        <h3>LiveSafe LA Score: {props.data.Rating}/5</h3>
        {props.data.RatingMessage}
      </div>
    )
  }


  const tables = [];

  if (props.dataLoaded) {
    for (let crimeCategory of CRIME_CATEGORIES) {
      if (props.data[crimeCategory] === undefined || props.data[crimeCategory].length === 0) {
        continue;
      }

      const tableRows = props.data[crimeCategory].map((crime,index) => {
        let crimeDate = new moment(new Date(crime.date_occ));
        crimeDate = crimeDate.format('MMMM DD, YYYY');

        return (
          <tr>
            <td>{crime.location}</td>
            <td>{crimeDate}</td>
          </tr>
        )
      })

      tables.push((
        <div>
          <h4>{crimeCategory}</h4>

          <div className="table-container">
            <table className="table">
              {tableRows}
            </table>
          </div>
        </div>
      ))
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h2>Rating</h2>

        {ratingMessage}
      </div>

      <div className="sidebar-section">
        <h2>Top Concerns</h2>

        <div className="concerns">
          {topConcernsOutput}
        </div>
      </div>

      <div className="sidebar-section">
        <h2>Records</h2>

        {tables}
      </div>
    </div>
  )
}
