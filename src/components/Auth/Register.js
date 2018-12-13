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
import firebase from "../../firebase";

const GridColumn = Grid.Column;

class Register extends Component {
  state = {
    UserName: "",
    Email: "",
    Password: "",
    PasswordConfirmation: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit=(e)=>{
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.Email,this.state.Password)
    .then(createdUser=>{
        console.log(createdUser);
    })
    .catch(err=>{
        console.log(err)
    })
  }
  render() {

    const { UserName, Email, Password, PasswordConfirmation}= this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <GridColumn style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Register For Dev Chat
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="UserName"
                icon="user"
                iconPosition="left"
                placeholder="UserName"
                onChange={this.handleChange}
                type="text"
                value={UserName}
              />
              <Form.Input
                fluid
                name="Email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                type="email"
                value={Email}
              />
              <Form.Input
                fluid
                name="Password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                type="password"
                value={Password}
              />
              <Form.Input
                fluid
                name="PasswordConfirmation"
                icon="lock"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                type="password"
                value={PasswordConfirmation}
              />
              <Button fluid size="large">
                Submit
              </Button>
            </Segment>
          </Form>
          <Message>
            Already a user? <Link to="/login">Login</Link>
          </Message>
        </GridColumn>
      </Grid>
    );
  }
}

export default Register;
