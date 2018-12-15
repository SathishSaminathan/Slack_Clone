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

class Login extends Component {
  state = {
    Email: "",
    Password: "",
    Errors: [],
    Loading: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  isFormEmpty = ({ UserName, Email, Password, PasswordConfirmation }) => {
    return (
      !UserName.length ||
      !Email.length ||
      !Password.length ||
      !PasswordConfirmation.length
    );
  };

  handleSubmit = e => {
    if (this.isFormValid(this.state)) {
      e.preventDefault();
      this.setState({
        Errors: [],
        Loading: true
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.Email, this.state.Password)
        .then(signedInUser => {
          console.log("SignedInUser...", signedInUser);
          this.setState({
            Loading: false
          });
        })
        .catch(err => {
          this.setState({
            Errors: this.state.Errors.concat(err),
            Loading: false
          });
        });
    }
  };

  isFormValid = ({ Email, Password }) => Email && Password;

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : " ";
  };

  render() {
    const { Email, Password, Errors, Loading } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <GridColumn style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="puzzle piece" color="violet" />
            Login For Dev Chat
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="Email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                type="email"
                value={Email}
                className={this.handleInputError(Errors, "email")}
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
                className={this.handleInputError(Errors, "password")}
              />
              <Button
                color="violet"
                fluid
                size="large"
                disabled={Loading}
                className={Loading ? "loading" : ""}
              >
                Login
              </Button>
            </Segment>
          </Form>
          {Errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(Errors)}
            </Message>
          )}
          <Message>
            Don't hava a account? <Link to="/register"> Register </Link>
          </Message>
        </GridColumn>
      </Grid>
    );
  }
}

export default Login;
