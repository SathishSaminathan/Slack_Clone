import React from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";

import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";

import "./App.css";

const GridColumn = Grid.Column;

const App = ({ currentUser }) => {
  return (
    <Grid columns="equal" className="app" style={{ background: "eee" }}>
      <ColorPanel />
      <SidePanel currentUser={currentUser} />
      <GridColumn
        style={{
          marginLeft: 320
        }}
      >
        <Messages />
      </GridColumn>
      <GridColumn width={4}>
        <MetaPanel />
      </GridColumn>
    </Grid>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(App);
