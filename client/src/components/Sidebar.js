import React from 'react';

// At 4 or 5: show homicides, assaults, burglaries, arsons
// At 3: show assaults, burglaries, theft
// At 1 and 2: show theft, pickpocketing
// At 0: none, just be wary and use common sense

export default (props) => {
  let topConcerns = [];

  if (props.data.Rating >= 4) {
    topConcerns = [
      'Homicides',
      'Assaults',
      'Burglaries',
      'Arsons'
    ]
  } else if (props.data.rating == 3) {
    topConcerns = [
      'Assaults',
      'Burglaries',
      'Theft'
    ]
  } else if (props.data.rating == 0) {
    topConcerns = [
      'None'
    ]
  } else {
    topConcerns = [
      'Theft',
      'Pickpocketing'
    ]
  }

  const topConcernsOutput = topConcerns.map((heading) => (
    <li>
      <h3>{heading}</h3>
    </li>
  ))

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h2>Rating</h2>
        <p><b>{props.data.Rating}/5</b> {props.data.RatingMessage}</p>
      </div>

      <div className="sidebar-section">
        <h2>Top Concerns</h2>

        <ul>
          {topConcernsOutput}
        </ul>
      </div>

      <div className="sidebar-section">
        <h2>Statistics</h2>

        <p>More statistics would go here</p>
      </div>
    </div>
  )
}
