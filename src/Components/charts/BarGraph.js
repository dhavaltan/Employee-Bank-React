import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

export class BarGraph extends Component {
  dynamicColors() {
    const bgColorList = [];
    this.props.chartLabels.forEach((element) => {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      bgColorList.push(`rgba(${r},${g},${b},0.5)`);
    });

    return bgColorList;
  }

  render() {
    const data = {
      labels: this.props.chartLabels,
      datasets: [
        {
          label: "Employee Count",
          data: this.props.chartData,
          backgroundColor: this.dynamicColors(),
        },
      ],
    };

    return (
      <div>
        <Bar
          data={data}
          width={200}
          height={460}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            maintainAspectRatio: false,
          }}
        />
      </div>
    );
  }
}

export default BarGraph;
