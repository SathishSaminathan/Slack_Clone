import React, { Component } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const GridColumn = Grid.Column;

class Register extends Component {
  render() {
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <GridColumn style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Register For Dev Chat
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="UserName"
                onChange={this.handleChange}
                type="text"
              />
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                type="email"
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                type="password"
              />
              <Form.Input
                fluid
                name="passwordconfirmation"
                icon="lock"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                type="password"
              />
              <Button fluid size="large">Submit</Button>
            </Segment>
          </Form>
          <Message>Already a user? <Link to="/login">Login</Link></Message>
        </GridColumn>
      </Grid>
    );
  }
}

export default Register;
