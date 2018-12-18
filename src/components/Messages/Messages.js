import React, { Component } from "react";
import { Segment, Comment } from "semantic-ui-react";

import firebase from "../../firebase";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";

class Messages extends Component {
  state = {
    MessagesRef: firebase.database().ref("messages"),
    Channel: this.props.currentChannel,
    User: this.props.currentUser,
    Messages:[],
    MessagesLoading:true
  };

  componentDidMount(){
    const { Channel, User}= this.state;
    if(Channel && User){
      // console.log("Messages componentDidMount")
      this.addListeners(Channel.id)
    }
  }

  addListeners=(channelId)=>{
    this.addMessageListener(channelId);
  }

  addMessageListener=(channelId)=>{
    let loadedMessages=[];
    this.state.MessagesRef.child(channelId).on("child_added", snap=>{
      loadedMessages.push(snap.val());
      console.log("Messages",loadedMessages)
      this.setState({
        Messages:loadedMessages,
        MessagesLoading:false
      })
    })
  } 

  displayMessages=(messages)=>(
    messages.length>0 && messages.map(message=>(
      <Message key={message.timestamp} message={message} user={this.state.User}/>
    ))
  )

  render() {
    const { MessagesRef, Channel, User, Messages } = this.state;
    return (
      <React.Fragment>
        <MessagesHeader />

        <Segment>
          <Comment.Group className="messages">{/* Messages */}
            {this.displayMessages(Messages)}
          </Comment.Group>
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
