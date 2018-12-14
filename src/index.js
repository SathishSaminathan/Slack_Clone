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
import { setUser } from "./actions";

import "semantic-ui-css/semantic.min.css";

const store = createStore(rootReducer, composeWithDevTools());

class Root extends Component {
  componentDidMount() {
    console.log("redux value...", this.props.isLoading);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        this.props.setUser(user);
        this.props.history.push("/");
      }
    });
  }
  render() {
    console.log("redux value...", this.props.isLoading);
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

const mapStateFromProps = state => ({ isLoading: state.user.isLoading, currentUser:state.user.currentUser });

const RootWithAuth = withRouter(
  connect(
    mapStateFromProps,
    { setUser }
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
