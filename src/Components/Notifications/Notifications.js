import React, { Component } from "react";
import { Typography } from "@material-ui/core";

export class Notifications extends Component {
  render() {
    return (
      <div
        style={{
          boxShadow: "azure",
          padding: "20px",
          backgroundColor: "white",
        }}
      >
        {this.props.notifications.map((notification) => {
          return (
            <div
              style={{ marginBottom: "4px" }}
              key={notification.notificationId}
            >
              <Typography variant="h6" color="primary">
                {notification.text}
              </Typography>
              <p>
                {new Date(notification.notificationDate).toLocaleDateString()}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Notifications;
