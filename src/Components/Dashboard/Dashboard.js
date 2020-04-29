import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PieChart from "../charts/PieChart";
import BarGraph from "../charts/BarGraph";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import PeopleIcon from "@material-ui/icons/People";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import "./Dashboard.css";

import axios from "axios";
import { Typography } from "@material-ui/core";

export class Dashboard extends Component {
  state = {
    chartLabels: [],
    chartData: [],
    pieChartLabels: [],
    pieChartData: [],
    diversityStats: [],
  };

  componentDidMount() {
    axios
      .get("http://localhost:8082/projectStats")
      .then((res) => {
        res.data.forEach((ele) => {
          const name = ele.projectName;
          const count = ele.employeeCount;
          this.setState({
            ...this.state,
            chartLabels: [...this.state.chartLabels, name],
            chartData: [...this.state.chartData, count],
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:8082/diversityStats")
      .then((res) => {
        this.setState({
          ...this.state,
          diversityStats: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:8082/designationStats")
      .then((res) => {
        res.data.forEach((ele) => {
          const name = ele.designation;
          const count = ele.count;
          this.setState({
            ...this.state,
            pieChartLabels: [...this.state.pieChartLabels, name],
            pieChartData: [...this.state.pieChartData, count],
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Grid container>
          <Grid item lg={12}>
            <Grid style={{ marginTop: "30px" }} container>
              <Grid item lg={4}>
                <Card
                  style={{
                    padding: "0px 60px ",
                  }}
                  variant="outlined"
                >
                  <CardContent className="CardContent">
                    <div>
                      <Typography variant="h6">Total Employees</Typography>
                      <Typography variant="h4">
                        {this.props.employeeCount}
                      </Typography>
                    </div>
                    <div>
                      <PeopleIcon fontSize="large" />
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item lg={4}>
                <Card style={{ padding: "0px 60px " }} variant="outlined">
                  <CardContent className="CardContent">
                    <div>
                      <Typography variant="h6">Avg. Salary</Typography>
                      <Typography variant="h4">
                        {(
                          this.props.totalSalary / this.props.employeeCount
                        ).toFixed(2)}
                      </Typography>
                    </div>
                    <div>
                      <MonetizationOnIcon fontSize="large" />
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item lg={4}>
                <Card style={{ padding: "0px 60px " }} variant="outlined">
                  <CardContent>
                    <Typography variant="h6">Diversity of Employees</Typography>
                    {this.state.diversityStats.map((stat) => {
                      return (
                        <Typography variant="h5">
                          {stat.gender} : {stat.count}
                        </Typography>
                      );
                    })}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Grid item lg={6}>
            <h3
              style={{
                color: "blue",
                display: "flex",
                justifyContent: "center",
                marginTop: "100px",
              }}
            >
              Employee Count Per Project
            </h3>
            <BarGraph
              chartLabels={this.state.chartLabels}
              chartData={this.state.chartData}
            />
          </Grid>

          <Grid item lg={6}>
            <h3
              style={{
                color: "blue",
                display: "flex",
                justifyContent: "center",
                marginTop: "100px",
              }}
            >
              Designation wise Diversity
            </h3>

            <PieChart
              pieChartLabels={this.state.pieChartLabels}
              pieChartData={this.state.pieChartData}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
