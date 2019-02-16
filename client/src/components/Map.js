import React from 'react';

import {Map as EsriMap} from '@esri/react-arcgis';

import BermudaTriangle from './esri/TestLayer';
import CrimeLayer from './esri/CrimeLayer';

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="map">
        <EsriMap
          viewProperties={{
            center: [this.props.x, this.props.y],
            zoom: 15
          }}
        >
          <BermudaTriangle />
          <CrimeLayer data={this.props.data} x={this.props.x} y={this.props.y}/>
        </EsriMap>
      </div>
    )
  }
}

export default Map;
