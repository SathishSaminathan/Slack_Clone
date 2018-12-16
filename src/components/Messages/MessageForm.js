import React, { Component } from "react";
import { Segment, Button, Input, Label } from "semantic-ui-react";

class MessageForm extends Component {
  render() {
    return (
      <Segment className="message__form">
        <Input
          fluid
          name="Message"
          style={{
            marginBottom: "0.7em"
          }}
          lable={<Button icon="add" />}
          labelPosition="left"
          placeholder="Write your message"
        />
        <Button.Group widths="2" icon>
          <Button
            color="orange"
            content="Add Reply"
            labelPosition="left"
            icon="edit"
          />
          <Button
            color="teal"
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
          />
        </Button.Group>
      </Segment>
    );
  }
}

export default MessageForm;
