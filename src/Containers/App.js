import React, { Component } from "react";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import Menu from "../Components/menu/Menu";
import Content from "../Components/content/Content";
import axios from "axios";
import Footer from "../Components/footer/Footer";
import Notifications from "../Components/Notifications/Notifications";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import Dashboard from "../Components/Dashboard/Dashboard";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import { Modal } from "@material-ui/core";

export class App extends Component {
  state = {
    EmployeeDetails: [],
    Notifications: [],
    tabOpen: "Dashboard",
    showNotificationModal: false,
    totalSalary: 0,
  };

  componentDidMount() {
    axios
      .get("http://localhost:8082/employees")
      .then((res) => {
        this.setState({
          ...this.state,
          EmployeeDetails: res.data,
        });
        res.data.forEach((element) => {
          this.setState({
            ...this.state,
            totalSalary: this.state.totalSalary + element.salary,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:8082/notifications")
      .then((res) => {
        this.setState({
          ...this.state,
          Notifications: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  tabHandler = (tabText) => {
    this.setState({
      ...this.state,
      tabOpen: tabText,
    });
  };

  openModal = () => {
    this.setState({
      ...this.state,
      showNotificationModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      ...this.state,
      showNotificationModal: false,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          className="Notification-Modal"
          open={this.state.showNotificationModal}
          onClose={this.closeModal}
        >
          <Notifications notifications={this.state.Notifications} />
        </Modal>

        <header className="App-header">
          <h2>
            <AccountBalanceIcon fontSize="default" /> Employee Bank
          </h2>
          <IconButton onClick={this.openModal} aria-label="notifications">
            <NotificationsIcon style={{ color: "white" }} />
          </IconButton>
        </header>

        <Grid container>
          <Grid item lg={2}>
            <Menu tabHandler={(tabText) => this.tabHandler(tabText)} />
          </Grid>

          <Grid item lg={10}>
            {this.state.tabOpen === "Dashboard" ? (
              <Dashboard
                totalSalary={this.state.totalSalary}
                employeeCount={this.state.EmployeeDetails.length}
              />
            ) : this.state.tabOpen === "Employee Details" ? (
              <Content EmployeeDetails={this.state.EmployeeDetails} />
            ) : null}
          </Grid>
        </Grid>

        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
