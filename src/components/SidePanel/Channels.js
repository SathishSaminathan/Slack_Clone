import React, { Component } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import { connect } from "react-redux";

import { setCurrentChannel } from "../../actions";
import firebase from "../../firebase";

class Channels extends Component {
  state = {
    Channels: [],
    isModalVisible: false,
    ChannelName: "",
    ChannelDetails: "",
    ChannelsRef: firebase.database().ref("channels"),
    User: this.props.currentUser,
    FirstLoad: true,
    activeChannel: ""
  };

  componentDidMount() {
    this.addListener();
  }

  componentWillMount() {
    this.removeListener();
  }

  addListener = () => {
    let loadedChannels = [];
    this.state.ChannelsRef.on("child_added", snap => {
      loadedChannels.push(snap.val());
      this.setState({ Channels: loadedChannels }, () => this.setFirstChannel());
    });
  };

  removeListener = () => {
    this.state.ChannelsRef.off();
  };

  setFirstChannel = () => {
    const firstChannel = this.state.Channels[0];
    if (this.state.FirstLoad && this.state.Channels.length > 0) {
      this.props.setCurrentChannel(firstChannel);
      this.selectActiveChannel(firstChannel);
    }
    this.setState({
      FirstLoad: false
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  };

  addChannel = () => {
    const { ChannelName, ChannelDetails, ChannelsRef, User } = this.state;

    const key = ChannelsRef.push().key;

    const newChannel = {
      id: key,
      name: ChannelName,
      details: ChannelDetails,
      createdBy: {
        name: User.displayName,
        avatar: User.photoURL
      }
    };

    ChannelsRef.child(key)
      .update(newChannel)
      .then(() => {
        this.setState({
          ChannelName: "",
          ChannelDetails: "2"
        });
        this.closeModal();
        console.log("Channel Added");
      })
      .catch(err => {
        console.log(err);
      });
  };

  displayChannels = Channels =>
    Channels.length > 0 &&
    Channels.map(channel => (
      <Menu.Item
        key={channel.id}
        onClick={() => {
          this.changeChannel(channel);
        }}
        name={channel.name}
        style={{
          opacity: 0.7
        }}
        active={channel.id === this.state.activeChannel}
      >
        # {channel.name}
      </Menu.Item>
    ));

  changeChannel = Channel => {
    this.selectActiveChannel(Channel);
    this.props.setCurrentChannel(Channel);
  };

  selectActiveChannel = Channel => {
    console.log(Channel.id);
    this.setState({
      activeChannel: Channel.id
    });
  };

  isFormValid = ({ ChannelName, ChannelDetails }) =>
    ChannelName && ChannelDetails;

  openModal = () => this.setState({ isModalVisible: true });

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
            <Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          {/* Display Channels */}
          {this.displayChannels(Channels)}
        </Menu.Menu>
        {/* Add Channel Modal */}
        <Modal basic open={isModalVisible} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
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
            <Button color="green" inverted onClick={this.handleSubmit}>
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

export default connect(
  null,
  { setCurrentChannel }
)(Channels);
