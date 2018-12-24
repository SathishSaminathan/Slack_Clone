import React, { Component } from "react";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";

import Spinner from "../../widgets/Spinner";
import firebase from "../../firebase";

const GridColumn = Grid.Column;
const GridRow = Grid.Row;
const HeaderContent = Header.Content;

class UserPanel extends Component {
  state = {
    user: this.props.currentUser
  };

  dropDownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{this.state.user.displayName}</strong>
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
    const { user } = this.state;
    return user ? (
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
            {/* User Dropdown */}
            <Header
              inverted
              style={{
                padding: "0.25em"
              }}
              as="h4"
            >
              <Dropdown
                trigger={
                  <span>
                    <Image src={user.photoURL} spaced="right" avatar/>
                    {user.displayName}
                  </span>
                }
                options={this.dropDownOptions()}
              />
            </Header>
          </GridRow>
        </GridColumn>
      </Grid>
    ) : <Spinner/>
  }
}

export default UserPanel;
