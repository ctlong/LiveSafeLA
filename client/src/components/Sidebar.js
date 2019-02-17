import React from 'react';

// At 4 or 5: show homicides, assaults, burglaries, arsons
// At 3: show assaults, burglaries, theft
// At 1 and 2: show theft, pickpocketing
// At 0: none, just be wary and use common sense

import moment from 'moment';

import calculateConcerns from '../utils/concerns';

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

  let concerns = [];

  if (props.dataLoaded) {
    concerns = calculateConcerns(props.data);

    topConcerns = concerns.map((key, index) => {
      console.log(key);

      const crime = key[0];
      const count = key[1].length;

      if (count === 0) {
        return (undefined)
      }

      if (crime === 'Arson') {
        return {
          title: crime,
          content: `
            In the last 6 months, ${count} arson related crimes were reported in the area.
            Make sure to look into resources for fire proofing your home and look into
            investing in fire insurance in case of such a heinous crime.
          `
        }
      }

      if (crime === 'Assault') {
        return {
          title: crime,
          content: `
            In the last 6 months, ${count} assault related crimes were reported in the area.
            Be vigilant of your surroundings when walking through the area. If possible,
            commute in groups especially at night.
          `
        }
      }

      if (crime === 'Bike Theft') {
        return {
          title: crime,
          content: `
            In the last 6 months, ${count} bike theft crimes were reported in the area.
            If you are someone that uses their bike and leaves it outside, invest in a secure bike
            lock and make sure to follow the recommended bike lock procedures.
          `
        }
      }

      if (crime === 'Burglary') {
        return {
          title: crime,
          content: `
            In the last 6 months, ${count} burglary crimes were reported in the area.
            Make sure to lock and secure your home when you are not present. Look into
            investing in home security to ensure your home is properly monitored.
          `
        }
      }

      if (crime === 'Disturbing the Peace') {
        return {
          title: crime,
          content: `
            In the last 6 months, ${count} disturbing the peace crimes were reported in the area.
            Though a minor crime, be wary of any disturbances that may affect you or your neighbors.
          `
        }
      }

      if (crime === 'DUI/Reckless Driving') {
        return {
          title: crime,
          content: `
            In the last 6 months, ${count} DUI/reckless driving crimes were reported in the area.
            As a pedestrian, be careful about travelling and be cautious of reckless or drunk drivers.
            Same goes if you drive a car. If you notice any reckless driving in your area, report it
            immediately.
          `
        }
      }

      if (crime === 'Homicide') {
        return {
          title: crime,
          content: `
            In the last 6 months, ${count} homicides were reported in the area.
            Be vigilant about activities in your neighborhood and look into securing your home
            in case of a violent crime.
          `
        }
      }

      if (crime === 'Pickpocketing/Purse-Snatching') {
        return {
          title: crime,
          content: `
            In the last 6 months, ${count} pickpocketing/purse-snatching crimes were reported in the area.
            Hold onto your belongings carefully and be wary of the items you carry. Be cautious of
            suspicious figures and don't take your eyes off of your belongings.
          `
        }
      }

      if (crime === 'Robbery') {
        return {
          title: crime,
          content: `
            In the last 6 months, ${count} robberies were reported in the area.
            Be careful not to stand out as a potential victim for robbery. If confronted, do not fight back.
            Report a robbery immediately and avoid physical confrontation if possible.
          `
        }
      }

      if (crime === 'Sex Crimes') {
        return {
          title: crime,
          content: `
            In the last 6 months, ${count} sex crimes were reported in the area.
            Report any sex crimes to the appropriate officials.
          `
        }
      }

      if (crime === 'Theft/Larceny') {
        return {
          title: crime,
          content: `
            In the last 6 months, ${count} theft crimes were reported in the area.
            Keep an eye on your belongings and make sure they are in a secure location.
            Be wary of any suspicious individuals and keep your guard up at all times.
          `
        }
      }

      if (crime === 'Vandalism') {
        return {
          title: crime,
          content: `
            In the last 6 months, ${count} vandalism crimes were reported in the area.
            If you see any vandalism occuring, report it immediately.
          `
        }
      }

      if (crime === 'Vehicle Break-In') {
        return {
          title: crime,
          content: `
            In the last 6 months, ${count} vehicle break-ins were reported in the area.
            Lock your vehicle whenever it is unattended. Do not leave valuable belongings in
            your vehicle if possible and hide items from plain sight.
          `
        }
      }

      if (crime === 'Vehicle Theft') {
        return {
          title: crime,
          content: `
            In the last 6 months, ${count} vehicle thefts were reported in the area.
            Lock your vehicle whenever it is unattended. Watch your surroundings anytime you
            enter or leave your vehicle. Be careful about sitting idle in your car and note any
            suspicious individuals.
          `
        }
      }
    })
  }

  /*
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
  */

  let topConcernsOutput = topConcerns.map((concern, index) => {
    if (concern === undefined) {
      return (undefined);
    }

    return (
      <div className="concern" key={index}>
        <h3>{concern.title}</h3>

        <p>{concern.content}</p>
      </div>
    )
  })

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
          <tr key={crime.date_occ + '-' + index}>
            <td>{crime.location}</td>
            <td>{crimeDate}</td>
          </tr>
        )
      })

      tables.push((
        <div key={'table-' + crimeCategory}>
          <h4>{crimeCategory} ({props.data[crimeCategory].length})</h4>

          <div className="table-container">
            <table className="table">
              <tbody>
                {tableRows}
              </tbody>
            </table>
          </div>
        </div>
      ))
    }
  }

  const noTopConcerns = (<p>There are no top concerns for this area as there have not been many crimes here in the past 6 months.</p>);

  let undefinedCount = 0;
  for(var i=0;i<3;i++) {
    if (topConcernsOutput[i] === undefined) {
      undefinedCount++;
    }
  }

  if (undefinedCount === 3) {
    topConcernsOutput = noTopConcerns;
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
