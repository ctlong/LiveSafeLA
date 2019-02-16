import React from 'react';

export default (props) => (
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
)
