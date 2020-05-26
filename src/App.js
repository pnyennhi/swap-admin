import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
} from "react-router-dom";

import "./assets/css/style.css";

import Login from "./containers/Login/Login";
import Layout from "./containers/Layout/Layout";
import Book from "./containers/Book/Book";
import User from "./containers/User/User";

function App() {
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(storedUser);

  const handleLog = (user) => {
    setUser(user);
  };

  if (localStorage.getItem("user")) {
    return (
      <Router>
        <Layout onLogout={handleLog}>
          <Switch>
            <Route path="/book" component={Book} />
            <Route path="/user" component={User} />
            <Redirect exact from="/" to="/book" />
            <Redirect exact from="/login" to="/book" />
          </Switch>
        </Layout>
      </Router>
    );
  } else {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            render={() => <Login onLogin={handleLog} />}
          />
          <Redirect exact from="/" to="/login" />
        </Switch>
      </Router>
    );
  }
}

export default App;
