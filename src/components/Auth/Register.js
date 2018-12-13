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
import md5 from "md5";

const GridColumn = Grid.Column;

class Register extends Component {
  state = {
    UserName: "",
    Email: "",
    Password: "",
    PasswordConfirmation: "",
    Errors: [],
    Loading: false,
    userRef: firebase.database().ref("users")
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  isFormValid = () => {
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill all Fields" };
      this.setState({ Errors: errors.concat(error) });
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Passwords are not valid" };
      this.setState({ Errors: errors.concat(error) });
    } else {
      return true;
    }
  };

  isPasswordValid = ({ Password, PasswordConfirmation }) => {
    if (Password.length < 6 || PasswordConfirmation.length < 6) {
      return false;
    } else if (Password !== PasswordConfirmation) {
      return false;
    } else {
      return true;
    }
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
    if (this.isFormValid()) {
      e.preventDefault();
      this.setState({
        Errors: [],
        Loading: true
      });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.Email, this.state.Password)
        .then(createdUser => {
          console.log(createdUser);
          createdUser.user
            .updateProfile({
              displayName: this.state.UserName,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`
            })
            .then(() => {
              console.log("User details updated...");
              this.saveUser(createdUser).then(() => {
                console.log("user saved...");
                this.setState({
                  Loading: false
                });
              });
            })
            .catch(err => {
              console.log(err);
              this.setState({
                Errors: this.state.Errors.concat(err),
                Loading: false
              });
            });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            Errors: this.state.Errors.concat(err),
            Loading: false
          });
        });
    }
  };

  saveUser = createdUser => {
    return this.state.userRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
      email: createdUser.user.email
    });
  };

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : " ";
  };
  render() {
    const {
      UserName,
      Email,
      Password,
      PasswordConfirmation,
      Errors,
      Loading
    } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <GridColumn style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="orange" textAlign="center">
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
                // className={this.handleInputError(Error, "name")}
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
              <Form.Input
                fluid
                name="PasswordConfirmation"
                icon="lock"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                type="password"
                value={PasswordConfirmation}
                className={this.handleInputError(Errors, "password")}
              />
              <Button
                color="orange"
                fluid
                size="large"
                disabled={Loading}
                className={Loading ? "loading" : ""}
              >
                Submit
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
            Already a user? <Link to="/login">Login</Link>
          </Message>
        </GridColumn>
      </Grid>
    );
  }
}

export default Register;
