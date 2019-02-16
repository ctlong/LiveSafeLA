import React from 'react';
import { loadModules } from '@esri/react-arcgis';

const CRIME_CATEGORIES = {
  'Arson': {
    color: [255, 0, 0, 1]
  },
  'Assault': {
    color: [0, 255, 0, 1]
  },
  'Bike Theft': {
    color: [0, 0, 255, 1]
  },
  'Burglary': {
    color: [150, 0, 150, 1]
  },
  'Disturbing the Peace': {
    color: [200, 200, 0, 1]
  },
  'DUI/Reckless Driving': {
    color: [175, 100, 75, 1]
  },
  'Homicide': {
    color: [75, 100, 175, 1]
  },
  'Pickpocketing/Purse-Snatching': {
    color: [255, 255, 0, 1]
  },
  'Robbery': {
    color: [0, 255, 255, 1]
  },
  'Sex Crimes': {
    color: [20, 50, 90, 1]
  },
  'Theft/Larceny': {
    color: [90, 90, 120, 1]
  },
  'Vandalism': {
    color: [120, 120, 0, 1]
  },
  'Vehicle Break-In': {
    color: [190, 60, 40, 1]
  },
  'Vehicle Theft': {
    color: [40, 30, 98, 1]
  }
};

export default class CrimeLayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      graphic: null,
      data: {}
    }
  }

  render() { return null }

  drawPoints = () => {
    loadModules(['esri/Graphic']).then(([ Graphic ]) => {
      for (let crimeCategory in CRIME_CATEGORIES) {
        for (let crime of this.state.data[crimeCategory]) {
          const point = {
            type: "point",
            x: crime.location_1.coordinates[0],
            y: crime.location_1.coordinates[1]
          }

          const symbol = {
            type: "simple-marker",
            color: CRIME_CATEGORIES[crimeCategory].color,
            size: 20,
            style: "circle"
          };

          this.props.view.graphics.add(new Graphic({
            geometry: point,
            symbol: symbol,
            attributes: {
              crimeType: crimeCategory
            }
          }))
        }
      }
    }).catch((err) => console.error(err));
  }

  componentDidMount() {
    fetch(`/api/search?long=${this.props.x}&lat=${this.props.y}`)
    .then(response => response.json())
    .then(data => {
      this.setState({data}, () => {
        this.drawPoints(this.state.data)
        this.props.updateData(data);
      });
    });
  }
}
