import React, { Component } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

class Channels extends Component {
  state = {
    Channels: [],
    isModalVisible: false,
    ChannelName: "",
    ChannelDetails: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  openModal =()=> this.setState({ isModalVisible:true})

  closeModal = () => this.setState({ isModalVisible: false });
  render() {
    const { Channels, isModalVisible } = this.state;
    return (
      <React.Fragment>
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
            <Icon name="add" onClick={this.openModal}/>
          </Menu.Item>
          {/* Channels */}
        </Menu.Menu>
         {/* Add Channel Modal */}
        <Modal basic open={isModalVisible} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="ChannelName"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label="About the Channel"
                  name="ChannelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Channels;
