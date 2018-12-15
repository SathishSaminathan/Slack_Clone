import React, { Component } from "react";
import { Grid, Header, Icon, Dropdown } from "semantic-ui-react";

import firebase from "../../firebase";

const GridColumn = Grid.Column;
const GridRow = Grid.Row;
const HeaderContent = Header.Content;

class UserPanel extends Component {
  dropDownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>User</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>
    },
    {
      key: "signout",
      text: <span onClick={this.handleSignOut}>Sign Out</span>
    }
  ];

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Signed Out");
      });
  };

  render() {
    return (
      <Grid
        style={{
          background: "#4c3c4c"
        }}
      >
        <GridColumn>
          <GridRow
            style={{
              padding: "1.2em",
              margin: 0
            }}
          >
            {/* App Header */}
            <Header inverted floated="left" as="h2">
              <Icon name="code" />
              <HeaderContent>Dev Chat</HeaderContent>
            </Header>
          </GridRow>
          {/* User Dropdown */}
          <Header
            inverted
            style={{
              padding: "0.2em"
            }}
            as="h4"
          >
            <Dropdown
              trigger={<span>User</span>}
              options={this.dropDownOptions()}
            />
          </Header>
        </GridColumn>
      </Grid>
    );
  }
}

export default UserPanel;
