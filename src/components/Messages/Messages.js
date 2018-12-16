import React, { Component } from "react";
import { Segment, Comment } from "semantic-ui-react";

import firebase from "../../firebase";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";

class Messages extends Component {
  state = {
    MessagesRef: firebase.database().ref("messages"),
    Channel: this.props.currentChannel,
    User: this.props.currentUser
  };
  render() {
    const { MessagesRef, Channel, User } = this.state;
    return (
      <React.Fragment>
        <MessagesHeader />

        <Segment>
          <Comment.Group className="messages">{/* Messages */}</Comment.Group>
        </Segment>

        <MessageForm
          messagesRef={MessagesRef}
          currentChannel={Channel}
          currentUser={User}
        />
      </React.Fragment>
    );
  }
}

export default Messages;
