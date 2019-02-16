import React from 'react';
import { loadModules } from '@esri/react-arcgis';

export default class CrimeLayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      graphic: null
    }
  }

  render() { return null }

  componentWillMount() {
    loadModules(['esri/Graphic']).then(([ Graphic ]) => {

      const point = {
        type: "point",
        x: -118.28879683925818,
        y: 34.02916369747246
      }

      const symbol = {
        type: "simple-marker",
        color: [0,0,0,255],
        size: 12,
        style: "diamond"
      };

      // Add the geometry and symbol to a new graphic
      const graphic = new Graphic({
        geometry: point,
        symbol: symbol
      });

      console.log(graphic);

      this.setState({ graphic });
      this.props.view.graphics.add(graphic);
    }).catch((err) => console.error(err));
  }

  componentWillUnmount() {
    this.props.view.graphics.remove(this.state.graphic);
  }
}
