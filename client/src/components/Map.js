import React from 'react';

import { Map } from '@esri/react-arcgis';

export default (props) => (
  <div className="map">
    <Map
      viewProperties={{
        center: [-118.2851, 34.0224],
        zoom: 15
      }}
    />
  </div>
)
