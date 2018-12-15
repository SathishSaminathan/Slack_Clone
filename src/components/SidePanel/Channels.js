import React, { Component } from "react";
import { Menu, Icon } from "semantic-ui-react";

class Channels extends Component {
  state = {
    Channels: []
  };
  render() {
    const { Channels } = this.state;
    return (
      <Menu.Menu
        style={{
          paddingBottom: "2em"
        }}
      >
        <Menu.Item>
          <span>
            <Icon name="exchange" /> CHANNELS
          </span>{" "}
          ({Channels.length})
          <Icon name="add"/>
        </Menu.Item>
        {/* Channels */}
      </Menu.Menu>
    );
  }
}

export default Channels;
