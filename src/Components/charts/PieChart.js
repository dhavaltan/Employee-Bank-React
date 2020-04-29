import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

export class PieChart extends Component {
  dynamicColors() {
    const bgColorList = [];
    this.props.pieChartLabels.forEach((element) => {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      bgColorList.push(`rgba(${r},${g},${b},0.5)`);
    });

    return bgColorList;
  }

  render() {
    const data = {
      labels: this.props.pieChartLabels,
      datasets: [
        {
          data: this.props.pieChartData,
          backgroundColor: this.dynamicColors(),
        },
      ],
    };
    return (
      <div>
        <Pie data={data} height={145} />
      </div>
    );
  }
}

export default PieChart;
