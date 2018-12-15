import React, { Component } from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import firebase from "./firebase";
import App from "./components/App";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Spinner from "./widgets/Spinner";
import rootReducer from "./reducers";
import { setUser, clearUser } from "./actions";

import "semantic-ui-css/semantic.min.css";

const store = createStore(rootReducer, composeWithDevTools());

class Root extends Component {
  componentDidMount() {
    console.log("redux value...", this.props.isLoading);
    console.log("redux value User...", this.props.currentUser);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
        console.log("redux value User...", this.props.currentUser);
        this.props.history.push("/");
      } else {
        this.props.clearUser();
        this.props.history.push("/login");
      }
    });
  }
  render() {
    return this.props.isLoading ? (
      <Spinner />
    ) : (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/" component={App} />
      </Switch>
    );
  }
}

const mapStateFromProps = state => ({
  isLoading: state.user.isLoading,
  currentUser: state.user.currentUser
});

const RootWithAuth = withRouter(
  connect(
    mapStateFromProps,
    { setUser, clearUser }
  )(Root)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
