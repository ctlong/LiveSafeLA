import React from 'react';

import { Map } from '@esri/react-arcgis';

export default (props) => (
  <div className="map">
    <Map
      viewProperties={{
        center: [props.x, props.y],
        zoom: 15
      }}
    />
  </div>
)
