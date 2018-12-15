import React, { Component } from "react";
import { Grid, Header, Icon, Dropdown } from "semantic-ui-react";

const GridColumn = Grid.Column;
const GridRow = Grid.Row;
const HeaderContent = Header.Content

class UserPanel extends Component {
    dropDownOptions=()=>[
        {
            ke:"user",
            text:<span>Signed in as <strong>User</strong></span>,
            disabled:true
        },
        {
            ke:"avatar",
            text:<span>Change Avatar</span>
        },{
            ke:"signout",
            text:<span>Sign Out</span>
        }

    ]
  render() {
    return <Grid style={{
        background:'#4c3c4c'
    }}>
        <GridColumn>
            <GridRow style={{
                padding:'1.2em',
                margin:0
            }}>
            {/* App Header */}
            <Header inverted floated="left" as='h2'>
                <Icon name="code"/>
                <HeaderContent>Dev Chat</HeaderContent>
            </Header>
            </GridRow>
            {/* User Dropdown */}
            <Header inverted style={{
                padding:"0.2em"
            }} as="h4">
                <Dropdown trigger={
                    <span>User</span>
                } options={this.dropDownOptions()}></Dropdown>
            </Header>
        </GridColumn>
    </Grid>;
  }
}

export default UserPanel;
