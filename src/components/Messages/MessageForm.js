import React, { Component } from "react";
import { Segment, Button, Input, Label } from "semantic-ui-react";

import FileModal from "./FileModal";

import firebase from "../../firebase";

class MessageForm extends Component {
  state = {
    Message: "",
    Loading: false,
    Channel: this.props.currentChannel,
    User: this.props.currentUser,
    Errors: [],
    messagesRef:this.props.messagesRef,
    IsModalVisible:false,
  };

  openModal=()=>this.setState({IsModalVisible:true})

  closeModal=()=>this.setState({IsModalVisible:false})

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  createMessage = () => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.User.uid,
        name: this.state.User.displayName,
        avatar: this.state.User.photoURL
      },
      content: this.state.Message
    };
    return message;
  };

  sendMessage = () => {
    const { messagesRef } = this.state;
    const { Message, Channel } = this.state;

    if (Message) {
      this.setState({
        Loading: true
      });
      messagesRef
        .child(Channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({
            Loading: false,
            Message: "",
            Errors: []
          });
        })
        .catch(err => {
          console.log("Sending Messaging.. err", err);
          this.setState({
            Loading: false,
            Errors: this.state.Errors.concat(err)
          });
        });
      // console.log(this.props.currentChannel)
    } else {
      this.setState({
        Errors: this.state.Errors.concat({ message: "Add a message" })
      });
    }
  };

  render() {
    const { Errors, Message, Loading, IsModalVisible } = this.state;
    return (
      <Segment className="message__form">
        <Input
          fluid
          name="Message"
          style={{
            marginBottom: "0.7em"
          }}
          value={Message}
          label={<Button icon="add" />}
          labelPosition="left"
          placeholder="Write your message"
          onChange={this.handleChange}
          className={Errors.some(error => error.message.includes("message")) ?'error':''}
        />
        <Button.Group widths="2" icon>
          <Button
            color="orange"
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            onClick={this.sendMessage}
            disabled={Loading}
            loading={Loading}
          />
          <Button
            color="teal"
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
            onClick={this.openModal}
          />
          <FileModal IsModalVisible={IsModalVisible} closeModal={this.closeModal}/>
        </Button.Group>
      </Segment>
    );
  }
}

export default MessageForm;
