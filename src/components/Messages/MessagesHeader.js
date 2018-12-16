import React, { Component } from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

class MessagesHeader extends Component {
  render() {
    return (
      <Segment clearing>

        {/* Channel Header */}
        <Header
          floated="left"
          as="h2"
          fluid
          style={{
            marginBottom: 0
          }}
        >
          <span>
            Channel
            <Icon name="star outline" color="black" />
          </span>
          <Header.Subheader>2 Users</Header.Subheader>
        </Header>

        {/* Channel Search Input */}
        <Header floated="right">
          <Input
            size="mini"
            icon="search"
            name="SearchTerm "
            placeholder="Search Messages"
          />
        </Header>
      </Segment>
    );
  }
}

export default MessagesHeader;
