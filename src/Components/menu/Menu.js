import React, { Component } from "react";
import "./Menu.css";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export class Menu extends Component {
  state = {
    menuItems: ["Dashboard", "Employee Details"],
  };

  render() {
    return (
      <div className="Menu">
        <div className="MenuTitle">
          <Typography variant="h5" color="primary" gutterBottom>
            Menu
          </Typography>
        </div>

        {this.state.menuItems.map((text) => (
          <List key={text}>
            <Button
              key={text}
              color="primary"
              onClick={() => this.props.tabHandler(text)}
            >
              {text}
            </Button>
          </List>
        ))}
      </div>
    );
  }
}

export default Menu;
