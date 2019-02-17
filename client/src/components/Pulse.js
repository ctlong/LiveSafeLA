import React from 'react';

import { Line as LineChart } from "react-chartjs";
import moment from "moment";

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

export default class Pulse extends React.Component {
  render() {
    const months = {}

    for (let crimeCategory of CRIME_CATEGORIES) {
      if (this.props.data[crimeCategory] === undefined || this.props.data[crimeCategory].length === 0) {
        continue;
      }

      for (let crime of this.props.data[crimeCategory]) {
        const month = new moment(crime.date_occ).format('MMMM YYYY');

        if (month === 'February 2019') {
          continue;
        }

        if (months[month] === undefined) {
          months[month] = 1;
        } else {
          months[month] = months[month] + 1;
        }
      }
    }

    const labels = Object.keys(months);

    labels.sort(function(first, second) {
      const firstMoment = new moment(first);
      const secondMoment = new moment(second);

      return firstMoment.diff(secondMoment);
    });

    const data = labels.map((key) => (
      months[key]
    ));

    const chartData = {
      labels: labels.slice(1, labels.length),
      datasets: [
        {
          label: "Crime Pulse",
          fillColor: "rgba(237, 43, 28, 0.2)",
    			strokeColor: "rgba(237, 43, 28, 0.5)",
    			pointColor: "rgb(237, 43, 28, 1)",
    			pointStrokeColor: "#fff",
    			pointHighlightFill: "#fff",
    			pointHighlightStroke: "rgba(151,187,205,1)",
          data: data.slice(1, data.length)
        }
      ]
    }

    return (
      <LineChart
        data={chartData}
        options = {{
          responsive: true,
          maintainAspectRatio: false,
          pointHitDetectionRadius : 10
        }}
        height="200"
        />
    )
  }
}
