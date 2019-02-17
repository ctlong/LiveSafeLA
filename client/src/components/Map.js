import React from 'react';

import {Map as EsriMap} from '@esri/react-arcgis';

import CrimeLayer from './esri/CrimeLayer';

class Map extends React.Component {
  render() {
    return (
      <div className="map">
        <EsriMap
          viewProperties={{
            center: [this.props.x, this.props.y],
            zoom: 15
          }}
        >
          <CrimeLayer
            x={this.props.x}
            y={this.props.y}
            updateData={this.props.updateData}
          />
        </EsriMap>
      </div>
    )
  }
}

export default Map;
