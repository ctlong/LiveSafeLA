import React from 'react';
import { loadModules } from '@esri/react-arcgis';

const COLOR = {
  'Yellow': [173, 173, 0, 0.75],
  'Red': [173, 0, 0, 0.75],
  'Purple': [173, 0, 85, 0.75],
  'Orange': [173, 110, 0, 0.75]
}

const SIZE = [
  10,
  15,
  20,
  40,
  80
]

const CRIME_CATEGORIES = {
  'Arson': {
    color: COLOR['Yellow'],
    size: SIZE[1]
  },
  'Assault': {
    color: COLOR['Red'],
    size: SIZE[2]
  },
  'Bike Theft': {
    color: COLOR['Orange'],
    size: SIZE[1]
  },
  'Burglary': {
    color: COLOR['Orange'],
    size: SIZE[2]
  },
  'Disturbing the Peace': {
    color: COLOR['Purple'],
    size: SIZE[0]
  },
  'DUI/Reckless Driving': {
    color: COLOR['Purple'],
    size: SIZE[2]
  },
  'Homicide': {
    color: COLOR['Red'],
    size: SIZE[4]
  },
  'Pickpocketing/Purse-Snatching': {
    color: COLOR['Orange'],
    size: SIZE[0]
  },
  'Robbery': {
    color: COLOR['Orange'],
    size: SIZE[3]
  },
  'Sex Crimes': {
    color: COLOR['Purple'],
    size: SIZE[1]
  },
  'Theft/Larceny': {
    color: COLOR['Orange'],
    size: SIZE[2]
  },
  'Vandalism': {
    color: COLOR['Yellow'],
    size: SIZE[0]
  },
  'Vehicle Break-In': {
    color: COLOR['Orange'],
    size: SIZE[1]
  },
  'Vehicle Theft': {
    color: COLOR['Orange'],
    size: SIZE[2]
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

          const color = CRIME_CATEGORIES[crimeCategory].color;
          const size = CRIME_CATEGORIES[crimeCategory].size;

          const symbol = {
            type: "simple-marker",
            color,
            size,
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
