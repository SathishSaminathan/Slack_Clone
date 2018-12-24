import React, { Component } from "react";
import { Modal, Input, Button, Icon } from "semantic-ui-react";

class FileModal extends Component {
  render() {
    const { IsModalVisible, closeModal } = this.props;
    return (
      <Modal basic open={IsModalVisible} onClose={closeModal}>
        <Modal.Header>Select an Image File</Modal.Header>
        <Modal.Content>
          <Input fluid label="File types: jpg, png" type="file" name="file" />
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted>
            <Icon name="checkmark"/> Send
          </Button>
          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove"/> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default FileModal;
